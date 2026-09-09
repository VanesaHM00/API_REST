import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { obtenerMedias, crearMedia, actualizarMedia, eliminarMedia } from '../services/mediaService';

import { obtenerGeneros } from '../services/generoService';
import { obtenerDirectores } from '../services/directorService';
import { obtenerProductoras } from '../services/productoraService';
import { obtenerTipos } from '../services/tipoService';

function Media() {
  const [medias, setMedias] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);

  const [titulo, setTitulo] = useState('');
  const [sinopsis, setSinopsis] = useState('');
  const [url, setUrl] = useState('');
  const [imagen, setImagen] = useState('');
  const [anioEstreno, setAnioEstreno] = useState('');
  const [genero, setGenero] = useState('');
  const [director, setDirector] = useState('');
  const [productora, setProductora] = useState('');
  const [tipo, setTipo] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [resMedias, resGeneros, resDirectores, resProductoras, resTipos] = await Promise.all([
        obtenerMedias(),
        obtenerGeneros(),
        obtenerDirectores(),
        obtenerProductoras(),
        obtenerTipos()
      ]);
      setMedias(resMedias.data);
      setGeneros(resGeneros.data);
      setDirectores(resDirectores.data);
      setProductoras(resProductoras.data);
      setTipos(resTipos.data);
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudieron cargar los datos', 'error');
    }
  };

  const limpiarFormulario = () => {
    setTitulo('');
    setSinopsis('');
    setUrl('');
    setImagen('');
    setAnioEstreno('');
    setGenero('');
    setDirector('');
    setProductora('');
    setTipo('');
    setEditandoId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const media = {
      titulo,
      sinopsis,
      url,
      imagen,
      anioEstreno,
      genero,
      director,
      productora,
      tipo
    };

    try {
      if (editandoId) {
        await actualizarMedia(editandoId, media);
        Swal.fire('Actualizado', 'La media fue actualizada', 'success');
      } else {
        await crearMedia(media);
        Swal.fire('Creado', 'La media fue creada', 'success');
      }
      limpiarFormulario();
      cargarDatos();
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo guardar la media', 'error');
    }
  };

  const handleEditar = (media) => {
    setTitulo(media.titulo);
    setSinopsis(media.sinopsis);
    setUrl(media.url);
    setImagen(media.imagen);
    setAnioEstreno(media.anioEstreno);
    setGenero(media.genero?._id || '');
    setDirector(media.director?._id || '');
    setProductora(media.productora?._id || '');
    setTipo(media.tipo?._id || '');
    setEditandoId(media._id);
  };

  const handleEliminar = async (id) => {
    const confirmacion = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (confirmacion.isConfirmed) {
      try {
        await eliminarMedia(id);
        Swal.fire('Eliminado', 'La media fue eliminada', 'success');
        cargarDatos();
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'No se pudo eliminar la media', 'error');
      }
    }
  };

  return (
    <div>
      <h2>Medias (Películas y series)</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-2">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="URL de la película"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Imagen o foto de portada"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              placeholder="Año de estreno"
              value={anioEstreno}
              onChange={(e) => setAnioEstreno(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              required
            >
              <option value="">Seleccione género</option>
              {generos.filter(g => g.estado === 'Activo').map(g => (
                <option key={g._id} value={g._id}>{g.nombre}</option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
              required
            >
              <option value="">Seleccione director</option>
              {directores.filter(d => d.estado === 'Activo').map(d => (
                <option key={d._id} value={d._id}>{d.nombres}</option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={productora}
              onChange={(e) => setProductora(e.target.value)}
              required
            >
              <option value="">Seleccione productora</option>
              {productoras.filter(p => p.estado === 'Activo').map(p => (
                <option key={p._id} value={p._id}>{p.nombre}</option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
            >
              <option value="">Seleccione tipo</option>
              {tipos.map(t => (
                <option key={t._id} value={t._id}>{t.nombre}</option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <textarea
              className="form-control"
              placeholder="Sinopsis"
              value={sinopsis}
              onChange={(e) => setSinopsis(e.target.value)}
              rows="2"
            />
          </div>
          <div className="col-md-4">
            <button type="submit" className="btn btn-primary w-100">
              {editandoId ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </div>
      </form>

      <table className="table table-dark cinema-table align-middle mb-0">
        <thead>
          <tr>
            <th className="text-white">Título</th>
            <th className="text-white">Año</th>
            <th className="text-white">Género</th>
            <th className="text-white">Director</th>
            <th className="text-white">Productora</th>
            <th className="text-white">Tipo</th>
            <th className="text-white">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {medias.map((m) => (
            <tr key={m._id}>
              <td className="text-white">{m.titulo}</td>
              <td className="text-white">{m.anioEstreno}</td>
              <td className="text-white">{m.genero?.nombre}</td>
              <td className="text-white">{m.director?.nombres}</td>
              <td className="text-white">{m.productora?.nombre}</td>
              <td className="text-white">{m.tipo?.nombre}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditar(m)}>
                  Editar
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleEliminar(m._id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Media;