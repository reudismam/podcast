import style from './styles.module.scss';
import Icon from '@material-ui/core/Icon';

const Player = () => {
    return (
        <div className={style.playerContainer}>
            <header>
                <img src="/logo.png" alt="Tocando agora" />
                <strong>Tocando agora</strong>
            </header>

            <div className={style.emptyPlayer}>
                <strong>Selecione um podcast para ouvir</strong>
            </div>

            <footer className={style.empty}>
                <div className={style.progress}>
                    <span>00:00</span>
                    <div className={style.slider}>
                        <div className={style.emptySlider}></div>
                    </div>
                    <span>00:00</span>
                </div>

                <div className={style.buttons}>
                    <button type="button">
                    <Icon>shuffle</Icon>
                    </button>
                    <button type="button">
                    <Icon>skip_previous</Icon>
                    </button>
                    <button type="button" className={style.playButton}>
                    <Icon>play_circle</Icon>
                    </button>
                    <button type="button">
                    <Icon>skip_next</Icon>
                    </button>
                    <button type="button">
                    <Icon>repeat</Icon>
                    </button>
                </div>
            </footer>
        </div>
    );
}

export default Player;