import React from 'react';
import './Details.scss';
import { Link } from 'react-router-dom';

const Details = ({ registrationIsClosed, registrationLink, year }) => {

    return (
        <React.Fragment>

            <div id="parallax">
                <section className="content-section text-center font-weight-bold" id="details">

                    <div className="container">
                        <div className="content-section-heading">
                            <h1>Welcome to the {year} Federated Health Hockey Playoff Pool!</h1>

                            <p>In past years, we’ve raised over $7500 for this great cause. Now, help us make {year} a record year!</p>

                            <h2 className="text-center display-3 text-danger pb-2">So why this pool you ask?</h2>

                            <p>Well it's not your typical pool, where you are using your hockey smarts to get rich. Here winning is
                            based on a
                            combination of things, ranging from being pucky to being lucky! Yes, it’s easy to pick the top 2 or 3
                            players from each
                            playoff team. Everyone does that, right? But not everyone knows playoff pool scoring rules like you do,
                            like how rookies
                            or defensemen get more points if they happen to score a goal. That’s your hockey smarts. And nobody wants
                            a player to
                            get injured – but it’s going to happen. Will it be yours? Will luck beat the puck, or knowing your game
                            bring you the
                            fame? And sure, there are those top teams to pick from. But remember the St. Louis Blues? So even if you
                            can’t draft the
                            Vezna Trophy contending Zamboni driver, you don’t want to be asleep at the wheel. And you don’t have to
                            be. Because in
                            this pool you can diversify. You can make your dream team by drafting players from across the playoff
                            teams, or if you
                            want to rule the hockey world you can enter more than one team and play different strategies with each
                            entry. It’s up to
                  you!</p>

                            <p>Like previous years we've got lots of great prizes up for grabs. Last year the top 30 finishers were all
                            eligible to
                            claim a prize. So, this year get your name on that prize list, and help a great cause while you win! The
                            prize list is
                  growing everyday - take a look here:</p>

                            <Link to="/prizes" className="btn btn-dark btn-block white-text">View Prizes</Link>
                            <br />
                            <h1 className="text-danger">All this for only a Registration Fee of $20/team – puck-tastic!</h1>
                            <h4>You can't win if you're not in!</h4>
                            <span className={registrationIsClosed ? 'disabled' : ''}>
                                <a href={registrationLink} className={registrationIsClosed ? "btn btn-danger btn-block disabled white-text" : "btn btn-danger btn-block white-text"}>Register</a>
                            </span>
                        </div>
                    </div>
                </section>
            </div>

        </React.Fragment>
    );
};

export default Details;