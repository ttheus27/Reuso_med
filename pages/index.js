import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { Alert, Container, Form, Tab } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { basePath } from '../next.config.js';
import Seo from '../shared/layout-components/seo/seo';

const Home = () => {
    const [passwordshow1, setpasswordshow1] = useState(false);
    const [err, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const { email, password } = data;
    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setError('');
    };
    const router = useRouter();
    const routeChange = (role) => {
        // Redireciona com base no papel do usuário
        let path = '/admin/dashboard/';
        if (role === 'EDITOR') {
            path = '/admin/users/';
        }

        router.push(path);
        setIsLoading(false);
    };

    async function handleLogin(e) {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const result = await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password,
        });

        if (result?.error) {
            setError('Usuário e senha inválidos. Tente novamente!');
            setIsLoading(false);
        } else if (result?.ok) {
            // Login bem-sucedido - aguarda um pouco para garantir que a sessão foi criada
            try {
                // Aguarda um momento para garantir que a sessão foi criada
                await new Promise(resolve => setTimeout(resolve, 100));
                
                // Busca o usuário para obter a role
                const userResponse = await fetch(
                    `/api/user/getByEmail?email=${encodeURIComponent(
                        data.email
                    )}`
                );
                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    toast.success('Usuário logado com sucesso!🚀');
                    // Aguarda um pouco mais antes de redirecionar para garantir que a sessão está pronta
                    setTimeout(() => {
                        routeChange(userData.role);
                    }, 200);
                } else {
                    toast.success('Usuário logado com sucesso!🚀');
                    setTimeout(() => {
                        routeChange('ADMIN');
                    }, 200);
                }
            } catch (error) {
                console.error('Erro ao obter dados do usuário:', error);
                toast.success('Usuário logado com sucesso!🚀');
                setTimeout(() => {
                    routeChange('ADMIN');
                }, 200);
            }
        } else {
            setError('Erro ao fazer login. Tente novamente!');
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (document.body) {
            document
                .querySelector('body')
                .classList.add('ltr', 'error-page1', 'bg-primary');
        }

        return () => {
            document.body.classList.remove('ltr', 'error-page1', 'bg-primary');
        };
    }, []);

    return (
        <Fragment>
            <Seo title={'Login'} />
            <div className="square-box">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <Container>
                <div className="row justify-content-center align-items-center authentication authentication-basic h-100">
                    <div className="col-xl-5 col-lg-6 col-md-8 col-sm-8 col-xs-10 card-sigin-main mx-auto my-auto py-4 justify-content-center">
                        <div className="card-sigin">
                            <Tab.Container defaultActiveKey="nextjs">
                                <Tab.Content>
                                    <Tab.Pane
                                        eventKey="nextjs"
                                        className="border-0"
                                    >
                                        <div className="row g-0">
                                            {err && (
                                                <Alert variant="danger">
                                                    {err}
                                                </Alert>
                                            )}
                                            <div className="col-12">
                                                <div className="main-card-signin d-md-flex">
                                                    <div className="wd-100p">
                                                        <div className="">
                                                            <div className="main-signup-header">
                                                                <h2>
                                                                    Bem vindo de
                                                                    volta!
                                                                </h2>
                                                                <h6 className="font-weight-semibold mb-4">
                                                                    Por favor
                                                                    faça login
                                                                    para
                                                                    continuar.
                                                                </h6>
                                                                <div className="panel panel-primary">
                                                                    <div className="panel-body tabs-menu-body border-0 p-3">
                                                                        <form action="#">
                                                                            <div className="form-group">
                                                                                <label>
                                                                                    Email
                                                                                </label>{' '}
                                                                                <Form.Control
                                                                                    type="email"
                                                                                    placeholder="Email"
                                                                                    name="email"
                                                                                    defaultValue={
                                                                                        email
                                                                                    }
                                                                                    onChange={
                                                                                        changeHandler
                                                                                    }
                                                                                />
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label
                                                                                    htmlFor="signin-password"
                                                                                    className=" d-block"
                                                                                >
                                                                                    Password
                                                                                </label>
                                                                                <div className="input-group">
                                                                                    <Form.Control
                                                                                        className="form-control form-control-lg"
                                                                                        id="signin-password"
                                                                                        placeholder="Digite sua senha"
                                                                                        name="password"
                                                                                        type={
                                                                                            passwordshow1
                                                                                                ? 'text'
                                                                                                : 'password'
                                                                                        }
                                                                                        value={
                                                                                            password
                                                                                        }
                                                                                        onChange={
                                                                                            changeHandler
                                                                                        }
                                                                                        required
                                                                                    />
                                                                                    <button
                                                                                        className="btn btn-light bg-transparent"
                                                                                        type="button"
                                                                                        onClick={() =>
                                                                                            setpasswordshow1(
                                                                                                !passwordshow1
                                                                                            )
                                                                                        }
                                                                                        id="button-addon2"
                                                                                    >
                                                                                        <i
                                                                                            className={`${
                                                                                                passwordshow1
                                                                                                    ? 'ri-eye-line'
                                                                                                    : 'ri-eye-off-line'
                                                                                            } align-middle`}
                                                                                        ></i>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-primary btn-block"
                                                                                onClick={handleLogin}
                                                                                disabled={isLoading}
                                                                            >
                                                                                {isLoading ? "Carregando..." : "Entrar"}
                                                                            </button>

                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </div>
                    </div>
                </div>
            </Container>
        </Fragment>
    );
};
export default Home;
