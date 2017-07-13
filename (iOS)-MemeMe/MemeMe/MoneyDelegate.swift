//
//  MoneyDelegate.swift
//  MemeMe
//
//  Created by Humad Syed on 7/8/17.
//  Copyright © 2017 Humad Syed. All rights reserved.
//

import UIKit

class MoneyDelegate: NSObject, UITextFieldDelegate {
    
    func isInt(_ string: NSString) -> Bool {
        return Int(String(string)) != nil
    }
    
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        var newText = textField.text! as NSString
        newText = newText.replacingCharacters(in: range, with: string) as NSString
        
        newText = newText.replacingOccurrences(of: "$", with: "") as NSString
        newText = newText.replacingOccurrences(of: ".", with: "") as NSString
        
        if isInt(newText) {
            
            var pennies = String(Int(String(newText))! % 100)
            
            // If pennies < 10
            if pennies.characters.count < 2 {
                pennies = "0" + pennies
            }
            
            let dollars = String(Int(String(newText))! / 100)
            
            textField.text = "$" + dollars + "." + pennies
        }
        
        return false
    }
    
    func textFieldDidBeginEditing(_ textField: UITextField) {
        if textField.text!.isEmpty {
            textField.text = "$0.00"
        }
    }
}
