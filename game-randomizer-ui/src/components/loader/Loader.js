import React from 'react';
import './Loader.css';

class Loader extends React.Component {
    //TODO: rewrite loader?
    showLoader() {
        document.querySelector('.App').classList.add('_app-loader-wrapper');
        document.querySelector('._loader-wrapper').style.display = '';
    }

    hideLoaderDiv() {
        if (document.readyState === 'complete') {
            if (document.querySelector('._loader-wrapper')) {
                document.querySelector('._loader-wrapper').style.display = 'none';
            }
        }
    }

    hideLoader() {
        if (document.readyState === 'complete') {
            if (document.querySelector('.App').classList.contains('_app-loader-wrapper')) {
                document.querySelector('.App').classList.remove('_app-loader-wrapper');
            }
            document.querySelector('._loader-wrapper').style.display = 'none';
        }
    }

    render() {
        if (this.props.showLoader) {
            this.showLoader();
            return (
                <div className='_loader-wrapper is-active'>
                    <div className='loader is-loading'>

                    </div>
                </div>
            );
        } else {
            this.hideLoader();
            return (
                <div className='_loader-wrapper'>
                    <div className='loader is-loading'>

                    </div>
                </div>
            );
        }
    }
}

export default Loader;