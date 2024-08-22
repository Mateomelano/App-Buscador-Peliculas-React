import React, { useState } from 'react';

export const BuscadorPeliculas = () => {
    const [busqueda, setBusqueda] = useState('');
    const [peliculas, setPeliculas] = useState([]);
    const [error, setError] = useState(null);

    const api_key = 'f3340f901c1d47fc0bbdd8e77a6af933';
    const urlBase = `https://api.themoviedb.org/3/search/movie`;

    const handleChange = (e) => {
        setBusqueda(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchPeliculas();
    };

    const fetchPeliculas = async () => {
        setError(null);
        console.log(`Buscando películas para: ${busqueda}`);  // Log de la búsqueda

        try {
            const response = await fetch(`${urlBase}?api_key=${api_key}&query=${busqueda}`);
            console.log(`URL de la API: ${urlBase}?api_key=${api_key}&query=${busqueda}`);  // Log de la URL

            const data = await response.json();
            console.log('Respuesta de la API:', data);  // Log de la respuesta

            if (data.results && data.results.length > 0) {
                setPeliculas(data.results);
            } else {
                setError('No se encontraron películas con ese término de búsqueda.');
                setPeliculas([]);
            }
        } catch (error) {
            console.error('Error al buscar las películas:', error);  // Log del error
            setError('Error al buscar las películas. Por favor, intenta de nuevo.');
            setPeliculas([]);
        }
    };

    return (
        <>
            <div className="container">
                <h1 className="title">Buscador de Películas</h1>
            </div>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar..."
                    value={busqueda}
                    onChange={handleChange}
                />
                <button type="submit" className="search-button">Buscar</button>
            </form>

            {error && <p className="error-message">{error}</p>}

            <div className="movie-list">
                {peliculas.length > 0 ? (
                    peliculas.map((pelicula) => (
                        <div key={pelicula.id} className="movie-item">
                            <h2>{pelicula.title}</h2>
                            <p>{pelicula.release_date}</p>
                            <img src={`https://image.tmdb.org/t/p/w200${pelicula.poster_path}`} alt={pelicula.title} />
                        </div>
                    ))
                ) : (
                    !error && <p>No hay resultados para mostrar.</p>
                )}
            </div>
        </>
    );
};
