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
                   <p>{api.Description}</p>
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
            <div class="countries">
                <h1>Public Apis</h1>
                {publicApi && Object.keys(publicApi).map(category => {
                    const list = publicApi[category];
                    return (
                        <div>
                            <h4>{category}</h4>
                            { this.renderFreeApi(list) }
                        </div>
                    );
                })}
            </div>
        );
    }
}