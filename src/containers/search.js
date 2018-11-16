import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchplanet} from '../actions';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        }
    }

    onInputChange = (e) => {       
        this.setState({
            inputValue: e.target.value
        });

        if (e.target.value) {
            this.props.dispatch(fetchplanet());
        }       
    }

    render() {
        const {planetList} = this.props;
        let toRenderList = '';

        if (planetList !== undefined && planetList.length > 0) {
            toRenderList = planetList.filter(items => items.name.indexOf(this.state.inputValue) === 0)
            .map((item, index) => {
                return <div className="search-results__list-item" key={index}>
                    <h2>{item.name}</h2>
                    <h3>{item.terrain}</h3>
                    <p>
                        <strong>
                            Population:  
                        </strong>
                        {item.population}
                    </p>
                </div>;
            })
        }

        return (
            <div className="container-fluid search-results">
                <h1> Search</h1>
                <form action="" method="GET">
                    <fieldset className="form-group">
                        <input id="inputSearch" name="inputSearch" className="form-control" type="search" placeholder="Search for.." value={this.state.inputValue} onChange= {this.onInputChange} />
                    </fieldset>
                </form>
                <div className="search-results__list">
                    {toRenderList}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    planetList: state.searchReducer.planetList
});

export default connect(mapStateToProps)(Search);