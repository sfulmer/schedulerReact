import React from 'react';

import './styles/Calendar.css';
import UpDownArrow from './images/UpDownArrow.png';

const LONG_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const SHORT_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
const LONG_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const SHORT_DAYS = ["Su", "M", "Tu", "W", "Th", "F", "Sa"];

class Calendar extends React.Component
{
	constructor(params)
    {
		super(params);

		var curDate = new Date();

		this.state =    {   currentDate:    curDate
                        ,   weeksStartEnd:  []
                        };
	}

    getCurrentDate()
    {
        return(this.state.currentDate);
    }

	getFirstDayOfMonth()
    {
        const dtCurrent = this.getCurrentDate();
		var dtFirstDay = new Date();
		dtFirstDay.setMonth(dtCurrent.getMonth());
		dtFirstDay.setFullYear(dtCurrent.getFullYear());
		dtFirstDay.setDate(1);

		var iFirstDay = dtFirstDay.getUTCDay();

		return(iFirstDay);
	}

	getLastDateOfMonth()
    {
        const dtCurrent = this.getCurrentDate();
		var dtLastDay = new Date();
		dtLastDay.setMonth(dtCurrent.getMonth() + 1);
		dtLastDay.setFullYear(dtCurrent.getFullYear());
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
			if(firstDayOfMonth > 0)
                numWeeks = 5;
            else
                numWeeks = 4;
		else if(numDaysInMonth == 29)
            if(firstDayOfMonth > 6)
			    numWeeks = 6;
            else
                numWeeks = 5;
		else if(numDaysInMonth == 30)
            if(firstDayOfMonth > 6)
			    numWeeks = 6;
            else
                numWeeks = 5;
		else // Days == 31
            if(firstDayOfMonth > 5)
			    numWeeks = 6;
            else
                numWeeks = 5;

		return(numWeeks);
	}

    getWeekData()
    {
        if(this.state.weeksStartEnd.length <= 0)
            {
            const iFirstDay = -this.getFirstDayOfMonth();
            const iLastDate = this.getLastDateOfMonth();
            var iLoop = iFirstDay;

            this.state.weeksStartEnd = [];

            {
            const iSunday = iFirstDay + 1;
            const iSaturday = 7 + iFirstDay;
        
            this.state.weeksStartEnd.push({ SundayDate: iSunday, SaturdayDate: iLoop = iSaturday });
            }
        
            for(var iWeekLength = this.getNumberOfWeeks(), iWeekLoop = 1; iWeekLoop < iWeekLength; iWeekLoop++)
                this.state.weeksStartEnd.push({ SundayDate: iLoop+1, SaturdayDate: iLoop += 7 });
            }

        return(this.state.weeksStartEnd);
    }

    render()
    {
        const this_ = this;
        
        return(
            <div>
                <table>
                    <Header calendarRef = {this_} setCurrentDate={this.setCurrentDate} />
                    <tbody>
                        <tr>
                            <td colSpan="3">
                                <InnerTable calendarRef = {this_} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>);
    }

    setCurrentDate(year, month, day)
    {
        var dt;

		if(typeof(day) == "undefined")
            dt = new Date(this.state.currentDate.getFullYear() + year, this.state.currentDate.getMonth() + month);
        else
            dt = new Date(this.state.currentDate.getFullYear() + year, this.state.currentDate.getMonth() + month, this.state.currentDate.getDate() + day);

        this.setState(  {   currentDate:    dt
                        ,   weeksStartEnd:  []
                        });
    }
}

class CurrentMonthHeader extends React.Component
{
	constructor(params)
    {
		super(params);

		this.state =    {   calendarRef:    this.props.calendarRef
                        ,   setCurrentDate: this.props.setCurrentDate
		                };
	}

	monthDownClick(event)
    {
        const args = [0, -1];
		
        this.state.setCurrentDate.apply(this.state.calendarRef, args);
	}

	monthUpClick(event)
    {
        const args = [0, 1];

        this.state.setCurrentDate.apply(this.state.calendarRef, args);
	}

	render()
    {
		return(
            <th id="thNow">
			    <span className="link" id="thNow_month">
				    {LONG_MONTHS[this.state.calendarRef.getCurrentDate().getMonth()]}
			    </span>
			    <span className="link scrollArrow">
				    <img alt="Scroll" src={UpDownArrow} useMap="#month_scrollmap" />
				    <map name="month_scrollmap">
					    <area alt="up-arrow" coords="0,0,16,7" href="#" onClick={(event) => this.monthUpClick(event)} shape="rect" />
					    <area alt="down-arrow" coords="0,8,16,16" href="#" onClick={(event) => this.monthDownClick(event)} shape="rect" />
				    </map>
			    </span>, <span className="link" id="thNow_year">{this.state.calendarRef.getCurrentDate().getFullYear()}</span>
			    <span className="link scrollArrow">
				    <img alt="Scroll" src={UpDownArrow} useMap="#year_scrollmap" />
				    <map name="year_scrollmap">
					    <area alt="up-arrow" coords="0,0,16,7" href="#" onClick={(event) => this.yearUpClick(event)} shape="rect" />
					    <area alt="down-arrow" coords="0,8,16,16" href="#" onClick={(event) => this.yearDownClick(event)} shape="rect" />
				    </map>
			    </span>
		    </th>);
	}

	yearDownClick(event)
    {
		const args = [-1, 0];
		
        this.state.setCurrentDate.apply(this.state.calendarRef, args);
	}

	yearUpClick(event)
    {
        const args = [1, 0];
		
        this.state.setCurrentDate.apply(this.state.calendarRef, args);
	}
}

class Header extends React.Component
{
    constructor(params)
    {
        super(params);

        this.state =    {   calendarRef:    this.props.calendarRef
                        ,   setCurrentDate: this.props.setCurrentDate
                        };
    }

    render()
    {
        return(
            <thead>
                <tr>
                    <PreviousMonthHeader calendarRef={this.state.calendarRef} setCurrentDate={this.state.setCurrentDate} />
                    <CurrentMonthHeader calendarRef={this.state.calendarRef} setCurrentDate={this.state.setCurrentDate} />
                    <NextMonthHeader calendarRef={this.state.calendarRef} setCurrentDate={this.state.setCurrentDate} />
                </tr>
            </thead>);
    }
}

class InnerTable extends React.Component
{
    constructor(params)
    {
        super(params);

		this.state =    {   calendarRef:    this.props.calendarRef  };
    }

    render()
    {
        return(
            <table style={{width: "100%"}}>
                <thead>
                    <tr>
                        {SHORT_DAYS.map((i, n) => <th key={n.toString()} style={{fontWeight: "bold", textDecoration: "underline"}}>{i}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {this.state.calendarRef.getWeekData().map((i, n) => (
                            <MonthWeek
                                key={n}
                                calendarRef={this.state.calendarRef}
                                sunday={i.SundayDate}
                                saturday={i.SaturdayDate}
                            />
                        ))}
                </tbody>
            </table>
        );
    }
}

class MonthDate extends React.Component
{
    constructor(params)
    {
        super(params);

        this.state =    {   date:   this.props.date    };
    }

    render()
    {
		if(this.state.date != null)
			return(<td style={{textAlign: "center"}}>{this.state.date}</td>);
		else
			return(<td style={{textAlign: "center"}}>&nbsp;</td>);
	}
}

class MonthWeek extends React.Component
{
    constructor(params)
    {
        super(params);

        this.state =    {   calendarRef:    this.props.calendarRef
                        ,   saturday:       this.props.saturday
                        ,	sunday:         this.props.sunday
		                };
    }

	getLastDateOfMonth()
    {
        const currentDate = this.state.calendarRef.getCurrentDate();
		var dtLastDay = new Date();
		dtLastDay.setMonth(currentDate.getMonth() + 1);
		dtLastDay.setFullYear(currentDate.getFullYear());
		dtLastDay.setDate(0);

		var iLastDate = dtLastDay.getDate();

		return(iLastDate);
	}

    render()
    {
        var dates = [];

		for(var iSaturday = this.state.saturday, iLoop = this.state.sunday; iLoop <= iSaturday; iLoop++)
			if ((iLoop > this.getLastDateOfMonth(this.state.month)) || (iLoop <= 0))
				dates.push(null);
			else
				dates.push(iLoop);

        return(<tr>
			{dates.map((date, n) => (
                <MonthDate key="n" date={date} />
            ))}
		</tr>);
    }
}

class NextMonthHeader extends React.Component
{
    constructor(params)
    {
        super(params);

        this.state =    {   calendarRef:    this.props.calendarRef
                        ,   setCurrentDate: this.props.setCurrentDate
                        };
    }

    funcNextMonthClick(event)
    {
        const args = [0, 1];
		
        this.state.setCurrentDate.apply(this.state.calendarRef, args);
	}

    render()
    {
        return(<th style={{cursor: "pointer"}} onClick={(event) => this.funcNextMonthClick(event)}>&gt;&gt;</th>);
    }
}

class PreviousMonthHeader extends React.Component
{
    constructor(params)
    {
        super(params);

        this.state =    {   calendarRef:    this.props.calendarRef
                        ,   setCurrentDate: this.props.setCurrentDate
                        };
    }

    funcPrevMonthClick(event)
    {
        const args = [0, -1];
		
        this.state.setCurrentDate.apply(this.state.calendarRef, args);
	}

    render()
    {
        return(<th style={{cursor: "pointer"}} onClick={(event) => this.funcPrevMonthClick(event)}>&lt;&lt;</th>);
    }
}

export default Calendar;