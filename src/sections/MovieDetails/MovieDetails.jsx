import { useParams } from 'react-router-dom';
import './MovieDetails.css';

import breakingBad from './assets/breakingbad.jpg';
import dune from './assets/dune.jpg';
import gameOfThrones from './assets/gameofthrones.jpg';
import MrRobot from './assets/mrRobot.jpg';
import laCasaDePapel from './assets/laCasaDePapel.jpg';
import manikarnika from '../movies/assets/manikarnika.jpg';
import moonknight from './assets/moonknight.jpg';
import opinhimer from './assets/oppenheimer.jpg';
import roobinhood from '../movies/assets/roobin hood.jpg';
import sekiro from '../movies/assets/sekiro.jpg';
import Thelastofus from './assets/thelastofus.jpg';
import TheWalkingDead from './assets/thewalkingdead.jpg';
import peakyblinders from './assets/peakyblinders.jpg';
import venom from './assets/venom.jpg';
import strangerThings from './assets/strangerthings.jpg';



const movieData = [
    {
        id: "1",
        title: "Breaking Bad",
        description: "A high school chemistry teacher turned methamphetamine producer.",
        imageUrl: breakingBad,
        trailerUrl: "https://www.youtube.com/embed/ceqOTZnhgY8?si=OxE64O8sen8TtG3R&amp",
    },
    {
        id: "2",
        title: "Dune",
        description: "*Dune* (2021) tells the story of Paul Atreides, a young noble on the desert planet Arrakis, where a valuable resource called 'spice' sparks power struggles and shapes his destiny.",
        imageUrl: dune,
        trailerUrl: "https://www.youtube.com/embed/n9xhJrPXop4?si=E83wFdkOrDl5u_ab&amp",
    },
    {
        id: "3",
        title: "Game of Thrones",
        description: "Seven kingdoms vie for control in a land of intrigue and warfare.",
        imageUrl: gameOfThrones,
        trailerUrl: "https://www.youtube.com/embed/KPLWWIOCOOQ?si=3wY6MGaYM-HGGzaa&amp",
    },
    {
        id: "4",
        title: "Mr Robot",
        description: "Seven kingdoms vie for control in a land of intrigue and warfare.",
        imageUrl: MrRobot,
        trailerUrl: "https://www.youtube.com/embed/N6HGuJC--rk?si=FXI8zXr010qe8zDl",
    },
    {
        id: "5",
        title: "La Casa De Papel",
        description: "Seven kingdoms vie for control in a land of intrigue and warfare.",
        imageUrl: laCasaDePapel,
        trailerUrl: "https://www.youtube.com/embed/_InqQJRqGW4?si=ttGW8--nTLsg1tdj",
    },
    {
        id: "6",
        title: "Manikarnika",
        description: "Seven kingdoms vie for control in a land of intrigue and warfare.",
        imageUrl: manikarnika,
        trailerUrl: "",
    },
    {
        id: "7",
        title: "Moon Knight",
        description: "Seven kingdoms vie for control in a land of intrigue and warfare.",
        imageUrl: moonknight,
        trailerUrl: "https://www.youtube.com/embed/x7Krla_UxRg?si=BFEsAT75MdM_sIJy",
    },
    {
        id: "8",
        title: "Opinhimer",
        description: "Seven kingdoms vie for control in a land of intrigue and warfare.",
        imageUrl: opinhimer,
        trailerUrl: "https://www.youtube.com/embed/bK6ldnjE3Y0?si=hyq7NJXnPYN5Cd-h",
    },
    {
        id: "9",
        title: "Robin Hood",
        description: "Seven kingdoms vie for control in a land of intrigue and warfare.",
        imageUrl: roobinhood,
        trailerUrl: "",
    },
    {
        id: "10",
        title: "Sekiro",
        description: "Seven kingdoms vie for control in a land of intrigue and warfare.",
        imageUrl: sekiro,
        trailerUrl: "",
    },
    {
        id: "11",
        title: "The Last Of Us",
        description: "Seven kingdoms vie for control in a land of intrigue and warfare.",
        imageUrl: Thelastofus,
        trailerUrl: "https://www.youtube.com/embed/uLtkt8BonwM?si=hh9usV6Vv0AZTrm3",
    },
    {
        id: "12",
        title: "The walking Dead",
        description: "Seven kingdoms vie for control in a land of intrigue and warfare.",
        imageUrl: TheWalkingDead,
        trailerUrl: "https://www.youtube.com/embed/sfAc2U20uyg?si=KyefU6_kBYkrP5Ri",
    },
    {
        id: "13",
        title: "Peaky Blinders",
        description: "Seven kingdoms vie for control in a land of intrigue and warfare.",
        imageUrl: peakyblinders,
        trailerUrl: "https://www.youtube.com/embed/EM12mcTEI88?si=SLpZZ8WUVKFNTxLq",
    },
    {
        id: "14",
        title: "Venom",
        description: "Seven kingdoms vie for control in a land of intrigue and warfare.",
        imageUrl: venom,
        trailerUrl: "https://www.youtube.com/embed/u9Mv98Gr5pY?si=BbzaW-kbIqsvK3lK",
    },
    {
        id: "15",
        title: "Stranger Things",
        description: "Seven kingdoms vie for control in a land of intrigue and warfare.",
        imageUrl: strangerThings,
        trailerUrl: "https://www.youtube.com/embed/b9EkMc79ZSU?si=hvaKEvSVjUF-e6yb",
    },

];


function MovieDetails() {
    const { id } = useParams();

    const movie = movieData.find((movie) => movie.id === id);

    if (!movie) {
        return <p>Movie not found</p>;
    }

    return (
        <div className="movie-details-container">
            <div className="trailer-container">
                <iframe className="Trailer-video"
                    width="100%"
                    height="100%"
                    src={movie.trailerUrl}
                    title={movie.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
            <div className="info-container">
                <img src={movie.imageUrl} alt={movie.title} className="movie-image" />
                <h1>{movie.title}</h1>
                <p>{movie.description}</p>
            </div>
        </div>
    );
}

export default MovieDetails;
