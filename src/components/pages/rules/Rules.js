import React, { useState, useEffect } from "react";
import "./Rules.scss";
import Scoring from "../../scoring/Scoring";

const Rules = () => {
  return (
    <>
      <div className="push-down"></div>
      <div id="rules">
        <h1 className="text-center">Rules</h1>
        <section className="listModule">
          <ol className="listCustom listNumbered">
            <li>
              All rosters must be completed by cut-off time of 6:00 PM on July
              31, 2021. Incomplete rosters will compete with limited ability to
              collect points.{" "}
            </li>

            <li>
              All rosters are final at cut-off time. Make sure you check the
              injury reports before selecting your roster. Injured players
              cannot be replaced{" "}
            </li>

            <li>
              Rosters will consist of 20 players maximum with the following
              combinations: Forwards: Min = 6 & Max = 12; Defenders: Min = 4 &
              Max = 8; Goalies: Min = 2 & Max = 3.
            </li>

            <li>
              Multiple team entries are permitted, a separate fee is required
              for each team entered.
            </li>

            <li>
              Entry fee is $20 per team entered. All teams must be paid in full
              in order to claim a prize.{" "}
            </li>

            <li>Points are cumulative throughout the playoffs.</li>

            <li>
              Prize distribution:  The Commissioners will announce a start date
              when prizes selection begins so that poolies can prepare to
              receive the notifications.  Poolies will receive an email
              notification in the order they finish in the pool informing them
              they have won a prize.  In efforts to help expedite prize
              distribution, poolies will have 24 hours to select their prize
              before randomly being awarded a prize.{" "}
            </li>

            <li>
              Most Goals will determine pool winner in the event of a tie.
            </li>

            <li>
              Enable Receive Nightly Messages to receive regular communications
              from the Commissioners.
            </li>

            <li>
              Trash Talk is enabled as it adds a level of competitiveness, but
              let's keep messages respectful.  The Commissioners will moderate
              messages and remove any which may be deemed disrespectful.
            </li>

            <li>
              Prizes are not labelled in any particular order; poolies can
              select any available prize.  Prize distribution is done on an
              elimination basis with the top scoring poolie having first choice,
              followed by next poolie, etc.
            </li>

            <li>Play to win and Have fun!</li>
          </ol>
        </section>
      </div>

      <Scoring />
    </>
  );
};

export default Rules;
