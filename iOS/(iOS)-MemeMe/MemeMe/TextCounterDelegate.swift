//
//  TextCounterDelegate.swift
//  MemeMe
//
//  Created by Humad Syed on 7/8/17.
//  Copyright © 2017 Humad Syed. All rights reserved.
//

import UIKit

class TextCounterDelegate: NSObject, UITextFieldDelegate {
    
    var counterLabel: UILabel?

    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        
        var newText = textField.text! as NSString
        newText = newText.replacingCharacters(in: range, with: string) as NSString
        
        counterLabel?.text = String(newText.length)
        
        return true
    }
    
    func textFieldDidBeginEditing(_ textField: UITextField) {

        counterLabel?.text = String((textField.text! as NSString).length)
        counterLabel?.isHidden = false
    }
    
}
