//
//  RandomColorDelegate.swift
//  MemeMe
//
//  Created by Humad Syed on 7/8/17.
//  Copyright © 2017 Humad Syed. All rights reserved.
//

import UIKit

class RandomColorDelegate: NSObject, UITextFieldDelegate {
    
    let colors: [UIColor] = [.red, .orange, .yellow, .green, .blue, .purple, .brown]
    
    func randomColor() -> UIColor {
        let randomIndex = Int(arc4random() % UInt32(colors.count))
        return colors[randomIndex]
    }
    
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString: String) -> Bool {
        textField.textColor = randomColor()
        
        return true
    }
    
}
