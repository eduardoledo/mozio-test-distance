import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { compose } from "redux";
import { items } from '../actions';

class MainForm extends Component {
    state = {
        from: '',
        to: '',
    }

    componentWillMount() {
        let { from, to } = this.props.match.params;
        console.log(this.props);
        this.props.fetchItems();
        this.props.fetchFrom(from);
        this.props.fetchTo(to);
    }

    componentDidMount() {
        let { from, to } = this.props;
        this.setState({ from, to });
    }

    navigateTo(route, from, to) {
        this.setState({ from, to });
        this.props.history.push(`${route}${from.id},${to.id}`);
    }

    render() {
        const { from, to } = this.props;
        const fromId = from ? from.id : '-'
        const toId = to ? to.id : '-';
        return (<div className="App">
            <form action={`/results/${fromId},${toId}`}>
                <label htmlFor={'from'}>From</label>
                <Autocomplete
                    getItemValue={(item) => item.id}
                    items={this.props.items}
                    renderItem={(item, isHighlighted) =>
                        <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                            {item.label}
                        </div>
                    }
                    value={from ? from.label : ''}
                    onChange={(e) => this.navigateTo("/", e.target.value, to)}
                    onSelect={(val) => this.navigateTo("/", val, to)}
                />
                <br />
                <label htmlFor={'to'}>To</label>
                <Autocomplete
                    getItemValue={(item) => item.id}
                    items={this.props.items}
                    renderItem={(item, isHighlighted) =>
                        <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                            {item.label}
                        </div>
                    }
                    value={to ? to.label : ''}
                    onChange={(e) => this.navigateTo("/", from, e.target.value)}
                    onSelect={(val) => this.navigateTo("/", from, val)}
                />
                <br />
                <button type={'submit'}>Submit</button>
            </form>
        </div>);
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

export default compose(connect(mapStateToProps, mapDispatchToProps))(withRouter(MainForm));