import {useSelector} from "react-redux";
import Routes from "./Routes";

const App = () => {
    const user = useSelector(({usersState}) => usersState.user);

    return <Routes user={user} />;
};

export default App;