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

    inputFrom = null;
    inputTo = null;

    componentWillMount() {
        let { from, to } = this.props.match.params;
        this.props.fetchItems();
        this.props.fetchFrom(from);
        this.props.fetchTo(to);
    }

    componentDidMount() {
        let { from, to } = this.props;
        this.setState({ from, to });
    }

    navigateTo(route, from, to) {
        this.props.fetchFrom(from);
        this.props.fetchTo(to);
        this.props.history.push(`${route}${from},${to}`);
    }

    renderItem(item, isHighlighted) {
        return <div key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
            {item.label}
        </div>
    }

    validateFields() {
        return this.props.from && this.props.to;
    }

    formOnSubmit(event) {
        if (!this.validateFields()) {
            event.preventDefault();
            const fromError = !this.props.from;
            const toError = !this.props.to;
            this.setState({ fromError, toError })
        }
    }

    render() {
        let { from, to } = this.props;
        const fromId = from ? from.id : '-'
        const toId = to ? to.id : '-';
        let fromError = this.state.fromError;
        let toError = this.state.toError;
        return (<div className="App">
            <form action={`/results/${fromId},${toId}`} onSubmit={(e) => this.formOnSubmit(e)}>
                <div style={{ background: fromError ? 'red' : 'white' }}>
                    <label htmlFor={'from'}>From</label>
                    <Autocomplete
                        ref={(ref) => { this.inputFrom = ref; }}
                        getItemValue={(item) => item.id}
                        items={this.props.items}
                        renderItem={this.renderItem}
                        value={from ? from.label : ''}
                        onChange={(e) => this.navigateTo("/", e.target.value, toId)}
                        onSelect={(val) => this.navigateTo("/", val, toId)}
                    />
                </div>
                <br />
                <div style={{ background: toError ? 'red' : 'white' }}>
                    <label htmlFor={'to'}>To</label>
                    <Autocomplete
                        ref={(ref) => { this.inputTo = ref; }}
                        getItemValue={(item) => item.id}
                        items={this.props.items}
                        renderItem={this.renderItem}
                        value={to ? to.label : ''}
                        onChange={(e) => this.navigateTo("/", fromId, e.target.value)}
                        onSelect={(val) => this.navigateTo("/", fromId, val)}
                    />
                </div>
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
