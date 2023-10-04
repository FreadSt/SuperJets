import ReactLoading from 'react-loading';

const Loader = ({ type, color }) => (
    <ReactLoading type={type} color={"#0d192d"} height={'20%'} width={'20%'} />
);

export default Loader;