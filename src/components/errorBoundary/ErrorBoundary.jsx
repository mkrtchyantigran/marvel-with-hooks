import { Component } from "react";
import Error from "../error/Error";

export class ErrorBoundary extends Component {
    state = {
        error: false
    }

    // static getDerivedStateFromError(error) {
    //     return { error: true };
    //  }

    componentDidCatch(error, Errorinfo) {
        this.setState({ error: true });
    }

    render() {
        if (this.state.error) {
            return <Error />;
        }
        return this.props.children;
    }
}

