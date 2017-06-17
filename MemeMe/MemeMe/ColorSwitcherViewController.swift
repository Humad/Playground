//
//  ColorSwitcherViewController.swift
//  MemeMe
//
//  Created by Humad Syed on 6/16/17.
//  Copyright © 2017 Humad Syed. All rights reserved.
//

import UIKit

class ColorSwitcherViewController: UIViewController {

    @IBOutlet weak var blueSlider: UISlider!
    @IBOutlet weak var greenSlider: UISlider!
    @IBOutlet weak var redSlider: UISlider!
    @IBOutlet weak var colorPanel: UIView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    @IBAction func updateColorPanel(_ sender: Any){
        if self.redSlider == nil {
            return
        }
        
        let r = redSlider.value
        let g = greenSlider.value
        let b = blueSlider.value
        
        colorPanel.backgroundColor = UIColor(red: CGFloat(r), green: CGFloat(g), blue: CGFloat(b), alpha: 1)
    }
    
    

}
