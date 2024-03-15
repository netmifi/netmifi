import { useStoreState } from 'easy-peasy';

const Home = () => {
    const logo = useStoreState((state) => state.logo);
    return (
        <div>
            {logo}
            <img src={logo} alt="" /></div>
    )
}

export default Home