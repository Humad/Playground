//
//  ClickCounterWithoutStoryboard.swift
//  MemeMe
//
//  Created by Humad Syed on 6/16/17.
//  Copyright © 2017 Humad Syed. All rights reserved.
//

import UIKit

class ClickCounterWithoutStoryboard: UIViewController {
    
    var count = 0
    var label: UILabel!
    var button: UIButton!

    override func viewDidLoad() {
        super.viewDidLoad()
        count = 0
        
        // Label
        let label = UILabel()
        label.frame = CGRect(x: 150, y: 150, width: 60, height: 60)
        label.text = "0"
        
        
        self.label = label
        self.view.addSubview(label)
        
        // Button
        let button = UIButton()
        button.frame = CGRect(x: 150, y: 250, width: 60, height: 60)
        button.setTitle("Click", for: .normal)
        button.setTitleColor(UIColor.blue, for: .normal)
        
        button.addTarget(self, action: #selector(ClickCounterWithoutStoryboard.incrementCount), for: UIControlEvents.touchUpInside)
        self.button = button
        self.view.addSubview(button)
        
        
    }
    
    func incrementCount(){
        count += 1
        label.text = "\(count)"
    }
    

}
