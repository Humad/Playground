//
//  MainViewController.swift
//  MemeMe
//
//  Created by Humad Syed on 7/6/17.
//  Copyright © 2017 Humad Syed. All rights reserved.
//

import UIKit

class MainViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
    @IBAction func showRockPaperScissorsSegueTest(_ sender: Any) {
        
        let storyboard = UIStoryboard(name: "RPSSegueTest", bundle: nil)
        let rockPaperScissorsController = storyboard.instantiateViewController(withIdentifier: "RPSSegueTestViewController") as! RPSSegueTestViewController
        
        self.navigationController?.pushViewController(rockPaperScissorsController, animated: true)
    }
    
    @IBAction func showModalExperiment(_ sender: Any) {
        
        let storyboard = UIStoryboard(name: "ModalExperiment", bundle: nil)
        let modalExperimentViewController = storyboard.instantiateViewController(withIdentifier: "ModalExperimentViewController") as! ModalExperimentViewController
        
        self.navigationController?.pushViewController(modalExperimentViewController, animated: true)
    }
    
    @IBAction func showColorSwitcher(_ sender: Any) {
        
        let storyboard = UIStoryboard(name: "ColorSwitcher", bundle: nil)
        let colorSwitcherViewController = storyboard.instantiateViewController(withIdentifier: "ColorSwitcherViewController") as! ColorSwitcherViewController
        
        self.navigationController?.pushViewController(colorSwitcherViewController, animated: true)
    }
    
    @IBAction func showClickCounter(_ sender: Any) {
        let storyboard = UIStoryboard(name: "ClickCounter", bundle: nil)
        let clickCounterViewController = storyboard.instantiateViewController(withIdentifier: "ClickCounterWithStoryboard") as! ClickCounterWithStoryboard
        
        self.navigationController?.pushViewController(clickCounterViewController, animated: true)
    }
    
    @IBAction func showTextFieldTest(_ sender: Any) {
        let storyboard = UIStoryboard(name: "TextFieldTest", bundle: nil)
        let textFieldTestViewController = storyboard.instantiateViewController(withIdentifier: "TextFieldTestViewController") as! TextFieldTestViewController
        
        self.navigationController?.pushViewController(textFieldTestViewController, animated: true)
    }
    
    @IBAction func showMemeMeV1(_ sender: Any) {
        let storyboard = UIStoryboard(name: "MemeMeV1", bundle: nil)
        let memeMeViewController = storyboard.instantiateViewController(withIdentifier: "MemeMeV1ViewController") as! MemeMeV1ViewController
        
        self.navigationController?.pushViewController(memeMeViewController, animated: true)
    }

}
