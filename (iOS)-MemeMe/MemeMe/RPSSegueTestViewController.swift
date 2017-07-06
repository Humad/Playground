//
//  RPSSegueTestViewController.swift
//  MemeMe
//
//  Created by Humad Syed on 6/21/17.
//  Copyright © 2017 Humad Syed. All rights reserved.
//

import UIKit

class RPSSegueTestViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        let controller = segue.destination as! ResultsViewController
        
        if segue.identifier == "PaperSegue" {
            controller.playerPick = 2
            controller.computerPick = randomPick()
        } else if segue.identifier == "ScissorsSegue" {
            controller.playerPick = 3
            controller.computerPick = randomPick()
        }
    }
    
    func randomPick() -> Int{
        return Int(1 + arc4random() % 3)
    }
    
    // Performing a segue purely with code
    @IBAction func rockSegue(){
        
        let resultController = self.storyboard?.instantiateViewController(withIdentifier: "ResultsViewController") as! ResultsViewController
        
        resultController.playerPick = 1
        resultController.computerPick = randomPick()
        
        self.present(resultController, animated: true, completion: nil)
    }
    
    // Performing a segue with both code and storyboard
    @IBAction func paperSegue(){
        performSegue(withIdentifier: "PaperSegue", sender: self)
    }
    
    

}
