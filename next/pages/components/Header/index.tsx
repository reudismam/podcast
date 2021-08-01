import style from './styles.module.scss';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

export const Header = () => {
    const currentDate = format(new Date(), 'EEEEEE, d MMM', {
        locale:ptBR
    });
    return (
        <header className={style.headerContainer}>
            <img className={style.logo} src="/logo.png" alt="Podcast" />

            <p>O melhor para você ouvir, sempre</p>

        <span>{currentDate}</span>
        </header>
    );
}