//
//  ClickCounterWithStoryboard.swift
//  MemeMe
//
//  Created by Humad Syed on 6/16/17.
//  Copyright © 2017 Humad Syed. All rights reserved.
//

import UIKit

class ClickCounterWithStoryboard: UIViewController {
    
    @IBOutlet weak var counterLabel: UILabel!
    @IBOutlet weak var counterButton: UIButton!
    
    var counter = 0

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func buttonPressed(_ sender: Any){
        counter += 1
        updateLabel()
    }
    
    func updateLabel(){
        counterLabel.text = String(counter)
    }


}

