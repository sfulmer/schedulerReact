import React from "react";
import { LONG_MONTHS } from './Calendar';

import Arrow from '../../assets/images/arrow.png';
import UpDownArrow from '../../assets/images/UpDownArrow.png';

class Header extends React.Component {
    constructor(params) {
        super(params);

        this.state = {
            month: this.props.month,
            setCurrentDate: this.props.setCurrentDate,
            year: this.props.year
        };
    }

    render() {
        return (
            <tr>
                <PreviousMonthHeader
                    month={this.state.month}
                    setCurrentDate={this.state.setCurrentDate}
                    year={this.state.year}
                />
                <CurrentMonthHeader
                    month={this.state.month}
                    setCurrentDate={this.state.setCurrentDate}
                    year={this.state.year}
                />
                <NextMonthHeader
                    month={this.state.month}
                    setCurrentDate={this.state.setCurrentDate}
                    year={this.state.year}
                />
            </tr>
        )
    }
}

class CurrentMonthHeader extends React.Component {
    constructor(params) {
        super(params);

        this.state = {
            month: this.props.month,
            setCurrentDate: this.props.setCurrentDate,
            year: this.props.year
        };
    }

    monthDownClick(event) {
        event.preventDefault();

        this.state.setCurrentDate(this.state.month - 1, undefined, this.state.year);
    }

    monthUpClick(event) {
        event.preventDefault();

        this.state.setCurrentDate(this.state.month + 1, undefined, this.state.year);
    }

    render() {
        return (<th id="thNow">
            <span className="link" id="thNow_month">
                {LONG_MONTHS[this.state.month]}
            </span>
            <span className="link scrollArrow">
                <img alt="Scroll" src={UpDownArrow} useMap="#month_scrollmap" />
                <map name="month_scrollmap">
                    <area alt="up-arrow" coords="0,0,16,7" href="#" onClick={(event) => this.monthUpClick(event)} shape="rect" />
                    <area alt="down-arrow" coords="0,8,16,16" href="#" onClick={(event) => this.monthDownClick(event)} shape="rect" />
                </map>
            </span>, <span className="link" id="thNow_year">{this.state.year}</span>
            <span className="link scrollArrow">
                <img alt="Scroll" src={UpDownArrow} useMap="#year_scrollmap" />
                <map name="year_scrollmap">
                    <area alt="up-arrow" coords="0,0,16,7" href="#" onClick={(event) => this.yearUpClick(event)} shape="rect" />
                    <area alt="down-arrow" coords="0,8,16,16" href="#" onClick={(event) => this.yearDownClick(event)} shape="rect" />
                </map>
            </span>
        </th>)
    }

    yearDownClick(event) {
        event.preventDefault();

        this.state.setCurrentDate(this.state.month, undefined, this.state.year - 1);
    }

    yearUpClick(event) {
        event.preventDefault();

        this.state.setCurrentDate(this.state.month, undefined, this.state.year + 1);
    }
}

class NextMonthHeader extends React.Component {
    constructor(params) {
        super(params);

        this.state = {
            month: this.props.month,
            setCurrentDate: this.props.setCurrentDate,
            year: this.props.year
        };
    }

    funcNextMonthClick(event) {
        this.state.setCurrentDate(this.state.month + 1, undefined, this.state.year);
    }

    render() {
        return (<th id="thNextMonth" onClick={(event) => this.funcNextMonthClick(event)}>&lt;&lt;</th>)
    }
}

class PreviousMonthHeader extends React.Component {
    constructor(params) {
        super(params);

        this.state = {
            month: this.props.month,
            setCurrentDate: this.props.setCurrentDate,
            year: this.props.year
        };
    }

    funcPreVMonthClick(event) {
        this.state.setCurrentDate(this.state.month - 1, undefined, this.state.year);
    }

    render() {
        return (<th id="thPreviousMonth" onClick={(event) => this.funcPreVMonthClick(event)}>&gt;&gt;</th>)
    }
}

export default Header;