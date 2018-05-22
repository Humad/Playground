//
//  ColorDelegate.swift
//  MemeMe
//
//  Created by Humad Syed on 7/8/17.
//  Copyright © 2017 Humad Syed. All rights reserved.
//

import UIKit

class ColorDelegate: NSObject, UITextFieldDelegate {

    // MARK: Properties
    
    let colors: [String : UIColor] = [
        "red": UIColor.red,
        "orange":  UIColor.orange,
        "yellow":  UIColor.yellow,
        "green":  UIColor.green,
        "blue":  UIColor.blue,
        "brown":  UIColor.brown,
        "black":  UIColor.black,
        "purple":  UIColor.purple,
        "cyan" : UIColor.cyan,
        "magenta" : UIColor.magenta,
        "white" : UIColor.white
    ]
    
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        var colorsInText = [UIColor]()
        
        var newText = textField.text! as NSString
        newText = newText.replacingCharacters(in: range, with: string) as NSString
        
        for (key, color) in colors {
            let colorRange = newText.range(of: key, options: .caseInsensitive)
            
            if colorRange.location != NSNotFound {
                colorsInText.append(color)
            }
        }
        
        if (colorsInText.count > 0) {
            textField.textColor = blendColorArray(colorsInText)
        }
        
        return true
        
    }
    
    func blendColorArray(_ colors: [UIColor]) -> UIColor {
        var colorComponents: [CGFloat] = [CGFloat](repeating: 0.0, count: 4)
        
        for color in colors {
            var red: CGFloat = 0
            var green: CGFloat = 0
            var blue: CGFloat = 0
            var alpha: CGFloat = 0
            
            color.getRed(&red, green: &green, blue: &blue, alpha: &alpha)
            
            colorComponents[0] += red
            colorComponents[1] += green
            colorComponents[2] += blue
            colorComponents[3] += alpha
        }
        
        for i in 0...colorComponents.count - 1 {
            colorComponents[i] /= CGFloat(colors.count)
        }
        
        return UIColor(red: colorComponents[0], green: colorComponents[1], blue: colorComponents[2], alpha: colorComponents[3])
    }
    
}
