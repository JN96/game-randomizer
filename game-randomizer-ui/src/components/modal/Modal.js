import React from 'react';
import './Modal.css';

class Modal extends React.Component{
    constructor(props) {
        super(props);

        this.handleOnClose = this.closeModal.bind(this);
    }

    openModal() {
        document.querySelector('.modal').classList.add('is-active');
    }

    closeModal(){
        document.querySelector('.modal').classList.remove('is-active');
    }

    render() {

        if (this.props.data) {
            return (
                    <div className="modal is-active">
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Error</p>
                            <button className="delete" aria-label="close" onClick={this.handleOnClose}></button>
                        </header>
                        <section className="modal-card-body">
                            {this.props.data.map(item => (
                                <div>
                                    <p>{item.message}</p>
                                    <p>{item.config.url}</p>
                                    <p>{item.timestamp}</p>
                                    <br/>
                                </div>
                            ))}
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-info" onClick={this.handleOnClose}>Cancel</button>
                        </footer>
                    </div>
                </div>
            )
        }
    }
}

export default Modal;