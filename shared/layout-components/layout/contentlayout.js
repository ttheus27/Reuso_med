import { useSession } from 'next-auth/react';
import { Fragment, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from '../../../shared/redux/store';
import Footer from '../footer/footer';
import Header from '../header/header';
import Sidebar from '../sidebar/sidebar';
import Switcher from '../switcher/switcher';
import TabToTop from '../tab-to-top/tab-to-top';

function formatWorkedTime(ms) {
    const totalSeconds = Math.floor((ms ?? 0) / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const pad = (n) => String(n).padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const Contentlayout = ({ children }) => {
    const { data: session } = useSession();
    const [lateLoad, setlateLoad] = useState(false);
    const [elapsed, setElapsed] = useState('00:00:00');

    const activeTask = session?.user?.activeTask;
    const hasActiveTask = Boolean(session?.user?.hasActiveTask && activeTask);

    console.log(session, 'session');

    useEffect(() => {
        setlateLoad(true);
    }, []);

    // timer da faixa
    useEffect(() => {
        if (!hasActiveTask) return;

        const { totalTimeWorkedMs, lastResumeAt } = activeTask;

        const compute = () => {
            let base = totalTimeWorkedMs || 0;
            if (lastResumeAt) {
                base += Date.now() - new Date(lastResumeAt).getTime();
            }
            setElapsed(formatWorkedTime(base));
        };

        compute();
        const id = setInterval(compute, 1000);
        return () => clearInterval(id);
    }, [
        hasActiveTask,
        activeTask?.totalTimeWorkedMs,
        activeTask?.lastResumeAt,
    ]);

    const remove = () => {
        if (document.querySelector('.card.search-result') != null) {
            document
                .querySelector('.card.search-result')
                ?.classList.add('d-none');
        }
    };

    return (
        <Fragment>
            <Provider store={store}>
                <div style={{ display: `${lateLoad ? 'block' : 'none'}` }}>
                    <Switcher />
                    <div className="page">
                        <Header session={session} />
                        <Sidebar />

                        <div className="main-content app-content">
                            {/* 🔶 Faixa da tarefa em andamento (empurra o conteúdo pra baixo) */}
                            {hasActiveTask && (
                                <div className="active-task-banner">
                                    <div className="active-task-left">
                                        <span className="active-task-label">
                                            TAREFA EM ANDAMENTO
                                        </span>
                                        <span className="active-task-title">
                                            {activeTask.title}
                                        </span>
                                        <span className="active-task-dot" />
                                    </div>
                                    <div className="active-task-time">
                                        {elapsed}
                                    </div>
                                </div>
                            )}

                            <div
                                className="container-fluid layout"
                                onClick={remove}
                            >
                                {children}
                            </div>
                        </div>

                        <Footer />
                    </div>
                    <TabToTop />
                </div>
            </Provider>
        </Fragment>
    );
};

export default Contentlayout;
