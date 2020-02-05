import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

class HomeLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <Head>
                    <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
                    <meta name="author" content="Shareaplace " />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1"
                    />
                </Head>
                <header id="header" className="whiteHeader">
                    <Header />
                </header>
                <div className="body">
                    <div className="container">
                        <div className="row">
                            {this.props.children}
                        </div>
                    </div>
                </div>
                <footer id="layout-footer">
                    <Footer />
                </footer>
            </React.Fragment>
        );
    }
}

export default HomeLayout;
