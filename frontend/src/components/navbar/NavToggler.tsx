import { useStoreActions, useStoreState } from 'easy-peasy';
import { AiOutlineBars, AiOutlineX } from 'react-icons/ai';
import { Button } from '../ui/button';

const NavToggler = () => {
    const navState = useStoreState((state) => state.navState);
    const setNavSate = useStoreActions((action) => action.setNavState);

    return (
        <Button onClick={() => setNavSate(!navState)}>
            {navState ? <AiOutlineX /> : <AiOutlineBars />}
        </Button>
    )
}

export default NavToggler