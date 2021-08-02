import { GetStaticPaths, GetStaticProps } from "next";
import { format, parseISO } from "date-fns";
import {api} from '../../services/api';
import ptBR from "date-fns/locale/pt-BR";
import { convertSecondsToTimeString } from "../../utils/convertDurationToTimeString";
import Image from 'next/image';

import style from './index.module.scss';
import { Icon } from "@material-ui/core";

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

type EpisodioProps = {
    episode: Episodio;
}
 
const Episode = ({episode}: EpisodioProps) => {
    return (
        <div className={style.episode}>
            <div className={style.thumbnailContainer}>
                <button type="button">
                    <Icon>arrow_back</Icon>
                </button>
                <Image 
                    width={700}
                    height={160}
                    src={episode.thumbnail}
                    objectFit="cover"
                />
                <button type="button">
                    <Icon>play_circle</Icon>
                </button>
            </div>

            <header>
                <h1>{episode.title}</h1>
                <span>{episode.members}</span>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationAsString}</span>
            </header>

            <div className={style.description} dangerouslySetInnerHTML={{__html: episode.description}}>
            </div>


        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async ()=> {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (ctx)=> {
    const {name} = ctx.params;
    const {data} = await api.get(`/episodios/${name}`);
    const episodio = data;

    const episode =  {
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
      console.log(episode);
    return {
        props: {
            episode
        },
        revalidate: 1 //24 hours
    }
}

export default Episode;

