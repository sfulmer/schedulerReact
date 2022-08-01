import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/Calendar.css';

class CurrentMonthHeader extends React.Component
{
	constructor(params)
	{
		super(params);

		this.state =	{	longMonths:		this.props.longMonths
						,	month:			this.props.month
						,	setCurrentDate:	this.props.setCurrentDate
						,	shortMonths:	this.props.shortMonths
						,	year:			this.props.year
						};
	}

	monthDownClick(event)
	{
		event.preventDefault();

		this.state.setCurrentDate(this.state.month - 1, undefined, this.state.year);
	}

	monthUpClick(event)
	{
		event.preventDefault();

		this.state.setCurrentDate(this.state.month + 1, undefined, this.state.year);
	}

	render()
	{
		return(<th id="thNow">
			<span class="link" id="thNow_month">
				this.longMonths[this.state.month]
			</span>
			<span class="link scrollArrow">
				<img alt="Scroll" src="images//UpDownArrow.png" usemap="#month_scrollmap" />
				<map name="month_scrollmap">
					<area alt="up-arrow" coords="0,0,16,7" href="#" onclick="(event)=>this.monthUpClick(event)" shape="rect" />
					<area alt="down-arrow" coords="0,8,16,16" href="#" onclick="(event)=>this.monthDownClick(event)" shape="rect" />
				</map>
			</span>, <span class="link" id="thNow_year">{this.state.year}</span>
			<span class="link scrollArrow">
				<img alt="Scroll" src="images//UpDownArrow.png" usemap="#year_scrollmap" />
					<map name="year_scrollmap">
						<area alt="up-arrow" coords="0,0,16,7" href="#" onclick="(event)=>this.yearUpClick(event)" shape="rect" />
						<area alt="down-arrow" coords="0,8,16,16" href="#" onclick="(event)=>this.yearDownClick(event)" shape="rect" />
					</map>
			</span>
		</th>)
	}

	yearDownClick(event)
	{
		event.preventDefault();

		this.state.setCurrentDate(this.state.month, undefined, this.state.year - 1);
	}

	yearUpClick(event)
	{
		event.preventDefault();

		this.state.setCurrentDate(this.state.month, undefined, this.state.year + 1);
	}
}

class Header extends React.Component
{
	constructor(params)
	{
		super(params);
		
		this.state	=	{	month:			this.props.month
						,	setCurrentDate:	this.props.setCurrentDate
						,	year:			this.props.year
						};
	}

	render()
	{
		return(<tr>
					<PreviousMonthHeader month={this.state.month} setCurrentDate={this.state.setCurrentDate} year={this.state.year} />
					<CurrentMonthHeader month={this.state.month} setCurrentDate={this.state.setCurrentDate} year={this.state.year} />
					<NextMonthHeader month={this.state.month} setCurrentDate={this.state.setCurrentDate} year={this.state.year} />
				</tr>)
	}
}

class InnerTable extends React.Component
{
	constructor(params)
	{
		super(params);
		
		this.longDays		=	["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		this.shortDays		=	["Su", "M", "Tu", "W", "Th", "F", "Sa"];

		this.state			=	{	weeksStartEnd:	this.props.weeksStartEnd	};
		
	}

	render()
	{
		return(<table id="inner">
			<thead>
				<tr>
					{ Array(7).map(i => <th style="text-decoration: underline;">{this.shortDays[i]}</th>) }
				</tr>
			</thead>
			<tbody>
				{ this.state.weeksStartEnd.map( i => <MonthWeek month={this.state.month} year={this.state.year} sunday={this.state.weeksStartEnd[i].SundayDate} saturday={this.state.weeksStartEnd[i].SaturdayDate} /> ) }
			</tbody>
		</table>);
	}
}

class MonthDate extends React.Component
{
	constructor(params)
	{
		super(params);
		
		this.state = {	date:	null	};
	}

	render()
	{
		if(this.state.date != null)
			return(<td>{this.state.date}</td>);
		else
			return(<td>&nbsp;/</td>);
	}
}

class MonthWeek extends React.Component
{
	constructor(params)
	{
		super(params);
		
		this.state =	{	month:		this.props.month
						,	saturday:	this.props.saturday
						,	sunday:		this.props.sunday
						,	year:		this.props.year
						};
	}

	getLastDateOfMonth()
	{
		var dtLastDay = new Date();
		dtLastDay.setMonth(this.state.month + 1);
		dtLastDay.setFullYear(this.state.year);
		dtLastDay.setDate(0);
		
		var iLastDate = dtLastDay.getDate();
		
		return(iLastDate);
	}

	render()
	{
		var dates = [];

		for(var iSaturday = this.state.saturday, iLoop = this.state.sunday; iLoop <= iSaturday; iLoop++)
			if((iLoop > this.getLastDateOfMonth(this.state.month)) || (iLoop <= 0))
				dates.push(null);
			else
				dates.push(iLoop);

		return(<tr>
			{ dates.map( date => <MonthDate date={date} /> ) }
		</tr>);
	}
}

class NextMonthHeader extends React.Component
{
	constructor(params)
	{
		super(params);
		
		this.state 	=	{	month:			this.props.month
						,	setCurrentDate:	this.props.setCurrentDate
						,	year:			this.props.year
						};
	}

	funcNextMonthClick(event)
	{
		this.state.setCurrentDate(this.state.month + 1, undefined, this.state.year);
	}

	render()
	{
		return(<th id="thNextMonth" onclick="(event) => this.funcNextMonthClick(event)">&lt;&lt;</th>)
	}
}

class PreviousMonthHeader extends React.Component
{
	constructor(params)
	{
		super(params);
		
		this.state 	=	{	month:			this.props.month
						,	setCurrentDate:	this.props.setCurrentDate
						,	year:			this.props.year
						};
	}

	funcPreVMonthClick(event)
	{
		this.state.setCurrentDate(this.state.month - 1, undefined, this.state.year);
	}

	render()
	{
		return(<th id="thPreviousMonth" onclick="(event) => this.funcPreVMonthClick(event)">&gt;&gt;</th>)
	}
}

class Calendar extends React.Component
{
    constructor(params)
    {
        super(params);

        var curDate = new Date();
		this.longMonths		=	["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		this.shortMonths	=	["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

        this.state			=	{   currentDate:    curDate	};
    }

    getFirstDayOfMonth()
	{
		var dtFirstDay = new Date();
		dtFirstDay.setMonth(this.state.currentDate.getMonth());
		dtFirstDay.setFullYear(this.state.currentDate.getFullYear());
		dtFirstDay.setDate(1);
		
		var iFirstDay = dtFirstDay.getUTCDay();
		
		return(iFirstDay);
	}

	getLastDateOfMonth()
	{
		var dtLastDay = new Date();
		dtLastDay.setMonth(this.state.currentDate.getMonth() + 1);
		dtLastDay.setFullYear(this.state.currentDate.getFullYear());
		dtLastDay.setDate(0);
		
		var iLastDate = dtLastDay.getDate();
		
		return(iLastDate);
	}

	getNumberOfWeeks()
	{
		const firstDayOfMonth = this.getFirstDayOfMonth();
		const numDaysInMonth = this.getLastDateOfMonth();
		var numWeeks = 0;

		if(numDaysInMonth == 28)
			numWeeks = 4 + (firstDayOfMonth > 0) ? 1 : 0;
		else if(numDaysInMonth == 29)
			numWeeks = 5 + (firstDayOfMonth > 6) ? 1 : 0;
		else if(numDaysInMonth == 30)
			numWeeks = 5 + (firstDayOfMonth > 6) ? 1 : 0;
		else // Days == 31
			numWeeks = 5 + (firstDayOfMonth > 5) ? 1 : 0;

		return(numWeeks);
	}
  
    render()
    {
        const iFirstDay = -this.getFirstDayOfMonth();
		const iLastDate = this.getLastDateOfMonth();
		var iLoop = iFirstDay;

		var weeksStartEnd = [];
		
		weeksStartEnd.push({SundayDate: -iFirstDay, SaturdayDate: iLoop = (7 - iFirstDay)});
		
		for(var iLength = this.getNumberOfWeeks(), iLoop = 1; iLoop < iLength; iLoop++)
			weeksStartEnd.push({SundayDate: iLoop, SaturdayDate: iLoop += 7});

		return(<div id="divCalendar">
					<table>
						<Header month={this.state.currentDate.getMonth()} setCurrentDate={this.setCurrentDate} year={this.state.currentDate.getFullYear()}  />
						<tbody>
							<tr>
								<td colspan="3">
									<InnerTable month={this.state.currentDate.getMonth()} weeksStartEnd={weeksStartEnd} year={this.state.currentDate.getFullYear()} />
								</td>
							</tr>
						</tbody>
					</table>
				</div>);
    }

	setCurrentDate(month, date, year)
	{
		if((typeof(date) == "undefined") && (typeof(year) == "undefined"))
			this.setState({		currentDate:    month	});
		else
			{
			var dt = new Date();

			if(typeof(month) == "undefined")
				dt.setMonth(this.state.currentDate.getMonth());
			else
				dt.setMonth(month);
			
			if(typeof(date) == "undefined")
				dt.setDate(this.state.currentDate.getDate());
			else
				dt.setDate(date);

			if(typeof(date) == "undefined")
				dt.setFullYear(this.state.currentDate.getFullYear());
			else
				dt.setFullYear(year);

			this.setState({		currentDate:	dt	});
			}
	}
}

export default Calendar;