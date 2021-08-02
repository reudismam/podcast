import { Icon } from '@material-ui/core';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GetStaticProps } from 'next';
import { api } from '../services/api';
import style from '../styles/Home.module.scss'
import { convertSecondsToTimeString } from '../utils/convertDurationToTimeString';
import Image from 'next/image';
import Link from 'next/link';

type Episodio = {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  publishedAt: string;
  duration: number;
  durationAsString: string;
  description: string;
  url: string;
}

type HomeProps = {
  latestEpisodios: Array<Episodio>,
  allEpisodios: Array<Episodio>
}

export default function Home({latestEpisodios, allEpisodios}: HomeProps) {
  /*useEffect(()=> {
    fetch("http://localhost:3333/episodios")
    .then(response => response.json())
    .then(data =>  alert(JSON.stringify(data)));
  }, []);*/

  return (
    <div className={style.homepage}>
      <section className={style.latestEpisodes}>
          <h2>Últimos lançamentos</h2>

          <ul>
            {
              latestEpisodios.map((episodio: Episodio) => {
                return (
                  <li key={episodio.id} className={style.episodeItem}>
                      <Image 
                        width={192} 
                        height={192} 
                        src={episodio.thumbnail} 
                        alt={episodio.title} 
                        objectFit="cover"
                        />

                      <div className={style.episodeDetails}> 
                        <Link  href={`/episode/${episodio.id}`}>
                        <a href="">{episodio.title}</a>
                        </Link>
                        <p>{episodio.members}</p>
                        <span>{episodio.publishedAt}</span>
                        <span>{episodio.durationAsString}</span>
                      </div>
                      <button>
                        <Icon>play_circle</Icon>
                      </button>
                  </li>
                );
              })
            }
          </ul>
      </section>

      <section className={style.allEpisodes}> 
            <h2>Todos episódios</h2>

            <table cellSpacing={0}>
              <thead>
                  <th></th>
                  <th>Podcast</th>
                  <th>Integrantes</th>
                  <th>Data</th>
                  <th>Duração</th>
                  <th></th>
              </thead>
              <tbody>
                {
                  allEpisodios.map((episode)=> {
                    return (
                      <tr key={episode.id}>
                        <td style={{width: "72px"}}>
                          <Image 
                            width={120}
                            height={120}
                            src={episode.thumbnail}
                            alt={episode.title}
                            objectFit="cover"
                          />
                        </td>
                        <td>
                          <Link  href={`/episode/${episode.id}`}>
                             <a>{episode.title}</a>
                          </Link>
                        </td>
                        <td>{episode.members}</td>
                        <td style={{width: 100}}>{episode.publishedAt}</td>
                        <td>{episode.durationAsString}</td>
                        <td>
                          <button type="button">
                            <Icon>play_circle</Icon>
                          </button>
                        </td>

                        
                      </tr>
                    );
                  })
                }
              </tbody>

            </table>
      </section>
    </div>
  )
}

/*export async function getServerSideProps() {
  const response = await fetch("http://localhost:3333/episodios");
  const data = await response.json();

  return {
    props: {
      episodios: data
    }
  }
}*/

export const getStaticProps: GetStaticProps = async () => {
  const response = await api.get("episodios", {
    params: {
      _limit: 12,
      _sort: "published_at",
      _order: "desc"
    }
  });
  const data = response.data;
  const episodios: Episodio[] = data.map((episodio)=> {
    return {
      id: episodio.id,
      title: episodio.title,
      thumbnail: episodio.thumbnail,
      members: episodio.members,
      publishedAt: format(parseISO(episodio.published_at), 'd MMM yy',  {locale: ptBR}),
      duration: episodio.file.duration,
      durationAsString: convertSecondsToTimeString(Number(episodio.file.duration)),
      description: episodio.description,
      url: episodio.file.url
    }
  });

  const latestEpisodios = episodios.slice(0, 2);
  const allEpisodios = episodios.slice(2, episodios.length);

  return {
    props: {
      latestEpisodios,
      allEpisodios
    },
    revalidate: 60 * 60 * 4
  }
}
