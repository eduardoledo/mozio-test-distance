import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose } from "redux";
import { items } from '../actions';
import { withRouter } from 'react-router-dom';

class Results extends Component {
    state = {
        from: '',
        to: '',
    }

    componentWillMount() {
        let { from, to } = this.props.match.params;
        console.log(from, to);
        this.props.fetchFrom(from);
        this.props.fetchTo(to);
    }

    componentDidMount() {
        let { from, to } = this.props;
        this.setState({ from, to });
    }

    getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(lat2 - lat1);
        var dLon = this.deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    }

    deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    render() {
        const { from, to } = this.props;
        let fromLabel = '';
        let toLabel = '';
        let distance = 0;
        if (from && to) {
            fromLabel = from.label;
            toLabel = to.label;
            distance = this.getDistanceFromLatLonInKm(from.lat, from.long, to.lat, to.long);
        }

        return (
            <div>
                <div>
                    From: {fromLabel}
                </div>
                <div>
                    To: {toLabel}
                </div>
                <div>
                    Distance: {Math.round(distance)}km
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    items: state.itemsState.items,
    from: state.itemsState.from,
    to: state.itemsState.to,
});

const mapDispatchToProps = {
    fetchItems: items.fetchItems,
    fetchFrom: items.fetchFrom,
    fetchTo: items.fetchTo,
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(withRouter(Results));
