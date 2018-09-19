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

  function getMatchCount() public constant returns(uint) {
    return matches.length;
  }

  function addMatch(string _matchName,string _team1, string _team2) public {
    matches.push(Match(Team(_team1,0), Team(_team2,0), _matchName));
  }

  function getMatch(uint _indexId) public view returns(string name, string team1, string team2, uint team1Votes, uint team2Votes) {
    return (matches[_indexId].name, 
      matches[_indexId].team1.name, 
      matches[_indexId].team2.name, 
      matches[_indexId].team1.votes, 
      matches[_indexId].team2.votes);
  }

  function placeBet(uint _indexId, string _teamName) public {
    if (keccak256(bytes(matches[_indexId].team1.name)) == keccak256(bytes(_teamName))) {
        matches[_indexId].team1.votes = matches[_indexId].team1.votes + 1;
        return; 
    }
    matches[_indexId].team2.votes = matches[_indexId].team2.votes + 1;
    return;
  }

}
