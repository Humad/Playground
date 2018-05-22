//
//  ResultsViewController.swift
//  MemeMe
//
//  Created by Humad Syed on 6/21/17.
//  Copyright © 2017 Humad Syed. All rights reserved.
//

import UIKit

class ResultsViewController: UIViewController {
    
    var playerPick: Int?
    var computerPick: Int?
    
    @IBOutlet weak var resultImage: UIImageView!
    @IBOutlet weak var resultText: UILabel!
    
    enum Picks {
        case rock, paper, scissors, tie
    }
    
    enum ResultStatus {
        case win, lose, tie
    }
    
    override func viewDidLoad() {
        if playerPick == computerPick {
            setImage(.tie)
            setText(.tie)
        } else if playerPick == 1 && computerPick == 2 { // player = rock, computer = paper
            setImage(.paper)
            setText(.lose)
        } else if playerPick == 1 && computerPick == 3 { // player = rock, computer = scissors
            setImage(.rock)
            setText(.win)
        } else if playerPick == 2 && computerPick == 1 { // player = paper, computer = rock
            setImage(.paper)
            setText(.win)
        } else if playerPick == 2 && computerPick == 3 { // player = paper, computer = scissors
            setImage(.scissors)
            setText(.lose)
        } else if playerPick == 3 && computerPick == 1 { // player = scissors, computer = rock
            setImage(.rock)
            setText(.lose)
        } else if playerPick == 3 && computerPick == 2 { // player = scissors, computer = paper
            setImage(.scissors)
            setText(.win)
        }
    }
    
    func setImage(_ result: Picks) {
        if result == .paper {
            resultImage.image = UIImage(named: "PaperCoversRock")
        } else if result == .rock {
            resultImage.image = UIImage(named: "RockCrushesScissors")
        } else if result == .scissors {
            resultImage.image = UIImage(named: "ScissorsCutPaper")
        } else {
            resultImage.image = UIImage(named: "ItsATie")
        }
    }
    
    func setText(_ status: ResultStatus) {
        if status == .tie {
            resultText.text = "Its a Tie!"
        } else if (status == .win) {
            resultText.text = "You win!"
        } else {
            resultText.text = "You lose!"
        }
    }

    @IBAction func dismiss(_ sender: Any) {
        self.dismiss(animated: true, completion: nil)
    }
}
