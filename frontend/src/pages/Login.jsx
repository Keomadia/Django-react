import Form from "../components/Form";

function Login(){
  const method = 'login';
  return <Form route="api/token/" method={method} />
 
}

export default Login;