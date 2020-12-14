import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../util/axiosApi';
import RoundTile from '../../components/SavedRoundComponents/RoundTitleTiles/RoundTile';

class RoundScores extends Component {
    state = {
        scores: [],
        notAuthenticatedRedirect: null
    }


    componentDidMount () {
        axios.get('/scores/users/' + this.props.match.params.user, { headers: {
            Authorization: 'Bearer ' + this.props.token
        }
    })
            .then(response => {
                const roundScores = response.data;
                this.setState({ scores: roundScores });
            })
            .catch(err => {
                console.log(err)
            })
    }

    roundTileClickedHandler = (id) => {
        this.props.history.push({ pathname: '/round/' + id });
    }

    render () {
        const scoreTiles = this.state.scores.map(el => {
            return <RoundTile 
                        key={el._id}
                        id={el._id}
                        courseName={el.courseName}
                        date={el.date.split('T')[0]}
                        clicked={() => this.roundTileClickedHandler(el._id)}
                        /> 
        });

        return (
            <React.Fragment>
                {scoreTiles.reverse()}
            </React.Fragment>
        );  
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        user: state.userId
    }
}

export default connect(mapStateToProps)(RoundScores);