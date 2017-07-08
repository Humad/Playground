//
//  ZipCodeDelegate.swift
//  MemeMe
//
//  Created by Humad Syed on 7/8/17.
//  Copyright © 2017 Humad Syed. All rights reserved.
//

import Foundation
import UIKit

class ZipCodeDelegate: NSObject, UITextFieldDelegate {
    
    func isInt(_ string: String) -> Bool {
        return Int(string) != nil
    }
    
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        
        var newText = textField.text! as NSString
        newText = newText.replacingCharacters(in: range, with: string) as NSString
        
        if (newText.length == 0) {
            return true
        }
        
        if newText.length > 5 || !isInt(newText as String) {
            return false
        }
        
        return true
        
    }
    
}
