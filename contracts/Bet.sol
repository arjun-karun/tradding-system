pragma solidity ^0.4.24;

contract Bet {

  struct Team {
    string name;
    uint votes;
  }

  struct Match {
      Team team1;
      Team team2;
      string name;
  }

  Match[] public matches;

  function addMatch(string _matchName,string _team1, string _team2) public {
    matches.push(Match(Team(_team1,0), Team(_team2,0), _matchName));
  }

}
