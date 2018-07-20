import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPublicApi } from 'actions/public-api';

@connect(state => ({
    publicApi: state.publicApi.publicApi,
    loading: state.publicApi.loading,
    error: state.publicApi.error
}))
export default class ApiCall extends Component {
    static propTypes = {
        error: PropTypes.string,
        loading: PropTypes.bool,
        publicApi: PropTypes.object,
        dispatch: PropTypes.func
    };

    componentWillMount() {
        const { dispatch, publicApi } = this.props;
        
        if (!publicApi) {
            dispatch(getPublicApi());
        }
    }

   renderFreeApi(publicApis) {
       return publicApis.map((api, i) => {
           return(
               <div key={api.Link}>
                   <a href={ api.Link}>{api.Description}</a>
               </div>
           )
       })
   }
    
    render() {
        const {
            publicApi,
            loading
        } = this.props;
        return (
            <div className="public-api">
                <h1>Public Apis</h1>
                {loading && <p>Loading...</p>}
                {!loading && publicApi && Object.keys(publicApi).map((category, i) => {
                    const list = publicApi[category];
                    return (
                        <div className='public-api__item' key={i}>
                            <h4>{category}</h4>
                            { this.renderFreeApi(list) }
                        </div>
                    );
                })}
            </div>
        );
    }
}