<?php

//############################################################################## CONSTANTS

const BR = "\n";

//############################################################################## CLASSES

class Deck {
//new Class to draw Cards from Deck

  private const card = [2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King", "Ace"];
  //Private constant array of Cards

  private const suit = ["Hearts" , "Diamonds", "Spades", "Clubs"];
  //Private constant array of Suits

  public $card;
  //Final Card rank value is stored here from draw() Method

  public $face;
  //Card Face is stored here, relly only used for the First Dealer Card which is called later

  public $suit;
  //Card Suit is stored here from draw() Method

  public function draw() {

    $pickCard = rand(0, 12);
    //Generates a random number from 0 = 2 to 12 = Ace for Card

    $card = Deck::card[$pickCard];
    //These variables store the card value and suit from Private self constant deck() and suit() Arrays using a random number as the index

    $this->face = $card;
    //Stores the card value including royal cards, in the face property of class, really only used for the Dealer First Card which is called later on

    if(($card == "Jack")||($card == "Queen")||($card == "King")){
      $this->card = 10; //If a royal card, the class object instance of card is 10

    }
    elseif($card == "Ace") {
      $this->card = 11; //If an Ace card, the class object instance of card is 11
    }
    else {
      $this->card = $card; //If neither the class object instance of card is the one drawn
    }

    $pickSuit = rand(0, 3);
    //Generates a random number from 0 = Hearts to 3 = Clubs for Suit

    $suit = Deck::suit[$pickSuit];
    //These variables store the card value and suit from Private self constant deck() and suit() Arrays using a random number as the index

    $this->suit = $suit; //Stores the suit in the class object instance of suit

    echo $card . " of " . $suit . "\n";
    //Echos card value and suit

  }

}

//############################################################################## GAME

$chips = 1000;
$dealerHand = array(); //Dealer cards array
$playerHand = array(); //Player cards array

//############################################################################## DEALER ROUND 1

do { //do while loop used, will go through once at least, then asked if they want to play again

echo BR;

echo "CHIPS = " . $chips . "\n";
$bet = readline("PLACE YOUR BET: "); //Player asked to make a bet before game starts

$chips -= $bet; //takes bet off chips

echo BR;

echo "DEALER \n"; //Dealer goes first in Blackjack

$dealerCard1 = new Deck(); //First object of Deck class for Dealer
$dealerCard1->draw(); //Runs the draw() method which outputs the First Card Drawn

echo " * of * \n";
//In Blackjack the Dealers 2nd Card is hidden to give the player something to bet against,
//The 2nd Card SHOULD be called here, but the way the class is set up, it would be displayed
//I could go back and change the class so that the card could still be called yet not displayed,
//however this would lead to a lot of additional code in the GAME section.
//To keep the code DRY, it is better to call the 2nd Card at a later stage after player turn, and because
//the pick is randomly generated, it is still fair.

$dealerCard1Rank = $dealerCard1->card;
$dealerCard1Face = $dealerCard1->face;
$dealerCard1Suit = $dealerCard1->suit;
//These variables ensure that the rank and suit selected from the $dealerCard1 object instance of the class Deck is kept to use later on, including any royal cards as this will only be to display the original

$dealerCard1Drawn = $dealerCard1Face . " of " . $dealerCard1Suit;
//Stores card in a variable (including face)

array_push($dealerHand, $dealerCard1Drawn);
//Stores card in array to be called later when all player cards taken need to be shown

//############################################################################## PLAYER ROUND 1

echo BR;

echo "PLAYER \n"; //Player goes next is dealt 2 cards

$playerCard1 = new Deck(); //First object of Deck class for Player
$playerCard1->draw(); //Runs the draw() method which outputs the First Card Drawn

$playerCard2 = new Deck(); //Second object of Deck class
$playerCard2->draw(); //Runs the draw() method which outputs the Second Card Drawn

$playerCard1Rank = $playerCard1->card; //Stores the rank of the first card drawn set in draw() Method
$playerCard1Face = $playerCard1->face;
$playerCard1Suit = $playerCard1->suit;

$playerCard1Drawn = $playerCard1Face . " of " . $playerCard1Suit;

$playerCard2Rank = $playerCard2->card; //Stores the rank of the second card drawn set in draw() Method
$playerCard2Face = $playerCard2->face;
$playerCard2Suit = $playerCard2->suit;

$playerCard2Drawn = $playerCard2Face . " of " . $playerCard2Suit;

$playerHandTotal = $playerCard1Rank + $playerCard2Rank;
//Adds ranks of each object together to get the hand value

array_push($playerHand, $playerCard1Drawn, $playerCard2Drawn);

echo "HAND = " . $playerHandTotal . "\n";

echo BR;

if ($playerHandTotal == 21) { //If Player gets BLACKJACK automatic win
  $chips += ($bet * 2.5);
  echo "BLACKJACK \n";
  echo BR;
}

//############################################################################## PLAYER RUN

else {

$player = readline("HIT, STAND OR DOUBLE DOWN \n");
echo BR;

if($player === "DOUBLE") {

  $bet *= 2; //CAN BET MORE THAN CHIPS, NEED TO FIX

  echo "PLAYER \n";

  foreach ($playerHand as $card){
    echo $card . "\n"; //outputs Player hand array so they can see all their old cards
  }

  $newCard = new Deck(); //creates a new object of the Deck class
  $newCard->draw(); //draws another card
  $newCardRank = $newCard->card; //Stores the rank of the second card drawn set in draw() Method
  $newCardFace = $newCard->face;
  $newCardSuit = $newCard->suit;

  $newCardDrawn = $newCardFace . " of " . $newCardSuit;
  array_push($playerHand, $newCardDrawn); //gets pushed to the player card array

  $playerHandTotal += $newCardRank; //new total gets updated

  echo "HAND = " . $playerHandTotal . "\n"; //shows new player total

  echo BR;

}

while($player === "HIT") { //Everytime the player Hits, this code will be executed

  echo "PLAYER \n";

  foreach ($playerHand as $card){
    echo $card . "\n"; //outputs Player hand array so they can see all their old cards
  }

  $newCard = new Deck(); //creates a new object of the Deck class
  $newCard->draw(); //draws another card
  $newCardRank = $newCard->card; //Stores the rank of the second card drawn set in draw() Method
  $newCardFace = $newCard->face;
  $newCardSuit = $newCard->suit;

  $newCardDrawn = $newCardFace . " of " . $newCardSuit;
  array_push($playerHand, $newCardDrawn); //gets pushed to the player card array

  $playerHandTotal += $newCardRank; //new total gets updated

  echo "HAND = " . $playerHandTotal . "\n"; //shows new player total
  echo BR;

  if ($playerHandTotal > 21) { //If their total exceeds 21 they bust and the game changes to dealers turn
    echo "BUST! \n";
    echo BR;
    break;
  }
  elseif ($playerHandTotal === 21) { //IF their total is 21 the game stops and changes to dealers turn
    //echo "21 \n";
    echo BR;
    break;
  }
  else {
    $player = readline("HIT OR STAND \n"); //asks question again to continue loop
  }

  echo BR;
}

}


//############################################################################## DEALER ROUND 2

if ($playerHandTotal > 21) { //If Player busts, run once to show cards dealer had

  $dealerCard2 = new Deck(); //makes a new object instance of the deck class

  echo "DEALER \n";
  echo $dealerCard1Face . " of " . $dealerCard1Suit . "\n";
  //This ensures the same card drawn before is used

  $dealerCard2->draw(); //draws a new card from the deck in the draw() method

  $dealerCard2Rank = $dealerCard2->card; //gets the cards rank
  $dealerCard2Face = $dealerCard2->face; //gets the cards face including royals
  $dealerCard2Suit = $dealerCard2->suit; //gets the cards suit

  $dealerCard2Drawn = $dealerCard2Face . " of " . $dealerCard2Suit; //creates the card
  array_push($dealerHand, $dealerCard2Drawn); //adds card to the dealer array

  $dealerHandTotal = $dealerCard1Rank + $dealerCard2Rank; //updates dealer total

  echo "DEALER = " . $dealerHandTotal . "\n";

  echo BR;

  echo "HAND = " . $playerHandTotal . "\n";
  echo "DEALER = " . $dealerHandTotal . "\n";
  echo BR;
  echo "LOST " . $bet;
  echo BR;
  //DEALER BEATS PLAYER

}

//##############################################################################

elseif ($playerHandTotal == 21) {
//If the player got 21, check to see if the dealer gets 21, if so, then the bet is pushed not won

  $dealerCard2 = new Deck(); //makes a new object instance of the deck class

  echo "DEALER \n";
  echo $dealerCard1Face . " of " . $dealerCard1Suit . "\n";
  //This ensures the same card drawn before is used

  $dealerCard2->draw(); //draws a new card from the deck in the draw() method

  $dealerCard2Rank = $dealerCard2->card; //gets the cards rank
  $dealerCard2Face = $dealerCard2->face; //gets the cards face including royals
  $dealerCard2Suit = $dealerCard2->suit; //gets the cards suit

  $dealerCard2Drawn = $dealerCard2Face . " of " . $dealerCard2Suit; //creates the card
  array_push($dealerHand, $dealerCard2Drawn); //adds card to the dealer array

  $dealerHandTotal = $dealerCard1Rank + $dealerCard2Rank; //updates dealer total

  echo "DEALER = " . $dealerHandTotal . "\n";

  $chips += ($bet * 2); //Doubles bet for winnings and returns

  if($dealerHandTotal == 21){
    echo "PUSH \n";
    echo BR;

    $chips += $bet; //Only gives back original bet
  }

  echo BR;

}

//##############################################################################

else {
//If neither run this code, player is on a normal number below 21

  $dealerCard2 = new Deck(); //makes a new object instance of the deck class

  echo "DEALER \n";
  echo $dealerCard1Face . " of " . $dealerCard1Suit . "\n";
  //This ensures the same card drawn before is used

  $dealerCard2->draw(); //draws a new card from the deck in the draw() method

  $dealerCard2Rank = $dealerCard2->card; //gets the cards rank
  $dealerCard2Face = $dealerCard2->face; //gets the cards face including royals
  $dealerCard2Suit = $dealerCard2->suit; //gets the cards suit

  $dealerCard2Drawn = $dealerCard2Face . " of " . $dealerCard2Suit; //creates the card
  array_push($dealerHand, $dealerCard2Drawn); //adds card to the dealer array

  $dealerHandTotal = $dealerCard1Rank + $dealerCard2Rank; //updates dealer total

  echo "DEALER = " . $dealerHandTotal . "\n";

  echo BR;

  if ($dealerHandTotal == 21) { //If dealer gets blackjack the loop breaks
    echo "BLACKJACK \n";
    echo BR;
  }

  //############################################################################## DEALER RUN

  else {
  //If dealer gets normal number below 21 he must keep drawing until above 16

  while($dealerHandTotal < 16) {

    echo "DEALER \n";

    foreach ($dealerHand as $card){
      echo $card . "\n";
    }

    $newCard = new Deck(); //creates a new object of the Deck class
    $newCard->draw(); //draws another card
    $newCardRank = $newCard->card; //Stores the rank of the second card drawn set in draw() Method
    $newCardFace = $newCard->face;
    $newCardSuit = $newCard->suit;

    $newCardDrawn = $newCardFace . " of " . $newCardSuit;
    array_push($dealerHand, $newCardDrawn); //gets pushed to the player card array

    $dealerHandTotal += $newCardRank; //new total gets updated

    echo "DEALER = " . $dealerHandTotal . "\n"; //shows new player total

    echo BR;

    if ($dealerHandTotal > 21) { //If dealer goes over 21, he busts and loop breaks
      echo "BUST! \n";
      echo BR;
      break;
    }
    elseif ($dealerHandTotal == 21) {
      break; //If dealer gets 21 loop breaks
    }

  }

}

//############################################################################## GAME CHECK

  if(($playerHandTotal <= 21)&&($dealerHandTotal > 21)||($dealerHandTotal < $playerHandTotal)){
    echo "HAND = " . $playerHandTotal . "\n";
    echo "DEALER = " . $dealerHandTotal . "\n";
    echo BR;
    echo "WON " . ($bet * 2);
    $chips += ($bet * 2);
    echo BR;
    //PLAYER BEATS DEALER
  }
  elseif($playerHandTotal === $dealerHandTotal){
    echo "HAND = " . $playerHandTotal . "\n";
    echo "DEALER = " . $dealerHandTotal . "\n";
    echo BR;
    echo "PUSH " . $bet;
    $chips += $bet;
    echo BR;
    //PLAYER AND DEALER DRAW
  }
  else {
    echo "HAND = " . $playerHandTotal . "\n";
    echo "DEALER = " . $dealerHandTotal . "\n";
    echo BR;
    echo "LOST " . $bet;
    echo BR;
    //DEALER BEATS PLAYER
  }

}

echo BR;

$game = readline("PLAY ANOTHER HAND? "); //Asks to play again, If YES loop continues

$playerHand = array(); //resets arrays so new cards can be drawn
$dealerHand = array();

}
while($game == "YES");

?>
