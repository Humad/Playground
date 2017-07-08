//
//  EmojiDelegate.swift
//  MemeMe
//
//  Created by Humad Syed on 7/8/17.
//  Copyright © 2017 Humad Syed. All rights reserved.
//

import UIKit

class EmojiDelegate: NSObject, UITextFieldDelegate {
    
    // MARK: Text to Emoji
    var translations = [String: String]()
    
    // MARK: Initializer
    override init() {
        super.init()
        
        translations["heart"] = "\u{0001F496}"
        translations["fish"] = "\u{E522}"
        translations["bird"] = "\u{E523}"
        translations["frog"] = "\u{E531}"
        translations["bear"] = "\u{E527}"
        translations["dog"] = "\u{E052}"
        translations["cat"] = "\u{E04F}"
    }
    
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        
        var replacedEmoji = false
        var emojiStringRange: NSRange
        
        // Construct the text that will be in the field if this change is accepted
        var newText = textField.text! as NSString
        newText = newText.replacingCharacters(in: range, with: string) as NSString
        
        for (emojiString, emoji) in translations {
            emojiStringRange = newText.range(of: emojiString, options: .caseInsensitive)
                
            // If emoji string found
            if emojiStringRange.location != NSNotFound {
                newText = newText.replacingCharacters(in: emojiStringRange, with: emoji) as NSString
                replacedEmoji = true
            }
        }
        
        if replacedEmoji {
            textField.text = newText as String
            return false
        }
        
        return true
        
    }
    
}
