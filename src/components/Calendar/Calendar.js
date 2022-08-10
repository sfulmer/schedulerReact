import React from 'react';
import Header from './Header';

import './Calendar.css';

const LONG_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const SHORT_DAYS = ["Su", "M", "Tu", "W", "Th", "F", "Sa"];

const LONG_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const SHORT_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];


class InnerTable extends React.Component {
	constructor(params) {
		super(params);

		this.longDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		this.shortDays = ["Su", "M", "Tu", "W", "Th", "F", "Sa"];

		this.state = { weeksStartEnd: this.props.weeksStartEnd };

	}

	render() {
		return (
			<table id="inner">
				<thead>
					<tr>
						{Array(7).map((i, n) => <th key={i + n} style="text-decoration: underline;">{this.shortDays[i]}</th>)}
					</tr>
				</thead>

				<tbody>
					{this.state.weeksStartEnd.map((i, n) => (
						<MonthWeek
							key={n}
							month={this.state.month}
							year={this.state.year}
							sunday={i.SundayDate}
							saturday={i.SaturdayDate}
						/>
					))}
				</tbody>
			</table>
		);
	}
}

class MonthDate extends React.Component {
	constructor(params) {
		super(params);

		this.state = { date: null };
	}

	render() {
		if (this.state.date != null)
			return (<td>{this.state.date}</td>);
		else
			return (<td>&nbsp;/</td>);
	}
}

class MonthWeek extends React.Component {
	constructor(params) {
		super(params);

		this.state = {
			month: this.props.month,
			saturday: this.props.saturday,
			sunday: this.props.sunday,
			year: this.props.year
		};
	}

	getLastDateOfMonth() {
		var dtLastDay = new Date();
		dtLastDay.setMonth(this.state.month + 1);
		dtLastDay.setFullYear(this.state.year);
		dtLastDay.setDate(0);

		var iLastDate = dtLastDay.getDate();

		return (iLastDate);
	}

	render() {
		var dates = [];

		for (var iSaturday = this.state.saturday, iLoop = this.state.sunday; iLoop <= iSaturday; iLoop++)
			if ((iLoop > this.getLastDateOfMonth(this.state.month)) || (iLoop <= 0))
				dates.push(null);
			else
				dates.push(iLoop);

		return (<tr>
			{dates.map((date, n) => <MonthDate key={n} date={date} />)}
		</tr>);
	}
}

class Calendar extends React.Component {
	constructor(params) {
		super(params);

		var curDate = new Date();

		this.state = {
			currentDate: curDate
		};
	}

	getFirstDayOfMonth() {
		var dtFirstDay = new Date();
		dtFirstDay.setMonth(this.state.currentDate.getMonth());
		dtFirstDay.setFullYear(this.state.currentDate.getFullYear());
		dtFirstDay.setDate(1);

		var iFirstDay = dtFirstDay.getUTCDay();

		return (iFirstDay);
	}

	getLastDateOfMonth() {
		var dtLastDay = new Date();
		dtLastDay.setMonth(this.state.currentDate.getMonth() + 1);
		dtLastDay.setFullYear(this.state.currentDate.getFullYear());
		dtLastDay.setDate(0);

		var iLastDate = dtLastDay.getDate();

		return (iLastDate);
	}

	getNumberOfWeeks() {
		const firstDayOfMonth = this.getFirstDayOfMonth();
		const numDaysInMonth = this.getLastDateOfMonth();
		var numWeeks = 0;

		if (numDaysInMonth == 28)
			numWeeks = 4 + (firstDayOfMonth > 0) ? 1 : 0;
		else if (numDaysInMonth == 29)
			numWeeks = 5 + (firstDayOfMonth > 6) ? 1 : 0;
		else if (numDaysInMonth == 30)
			numWeeks = 5 + (firstDayOfMonth > 6) ? 1 : 0;
		else // Days == 31
			numWeeks = 5 + (firstDayOfMonth > 5) ? 1 : 0;

		return (numWeeks);
	}

	render() {
		const iFirstDay = -this.getFirstDayOfMonth();
		const iLastDate = this.getLastDateOfMonth();
		var iLoop = iFirstDay;

		var weeksStartEnd = [];

		weeksStartEnd.push({ SundayDate: -iFirstDay, SaturdayDate: iLoop = (7 - iFirstDay) });

		for (var iLength = this.getNumberOfWeeks(), iLoop = 1; iLoop < iLength; iLoop++)
			weeksStartEnd.push({ SundayDate: iLoop, SaturdayDate: iLoop += 7 });

		return (<div id="divCalendar">
			<table>
				<thead>
					<Header
						month={this.state.currentDate.getMonth()}
						setCurrentDate={this.setCurrentDate}
						year={this.state.currentDate.getFullYear()}
					/>
				</thead>

				<tbody>
					<tr>
						<td colSpan="3">
							<InnerTable
								month={this.state.currentDate.getMonth()}
								weeksStartEnd={weeksStartEnd}
								year={this.state.currentDate.getFullYear()}
							/>
						</td>
					</tr>
				</tbody>
			</table>
		</div>);
	}

	setCurrentDate(month, date, year) {
		if ((typeof (date) == "undefined") && (typeof (year) == "undefined"))
			this.setState({ currentDate: month });
		else {
			var dt = new Date();

			if (typeof (month) == "undefined")
				dt.setMonth(this.state.currentDate.getMonth());
			else
				dt.setMonth(month);

			if (typeof (date) == "undefined")
				dt.setDate(this.state.currentDate.getDate());
			else
				dt.setDate(date);

			if (typeof (date) == "undefined")
				dt.setFullYear(this.state.currentDate.getFullYear());
			else
				dt.setFullYear(year);

			this.setState({ currentDate: dt });
		}
	}
}

export default Calendar;
export { LONG_DAYS, SHORT_DAYS, LONG_MONTHS, SHORT_MONTHS };