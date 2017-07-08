//
//  TextFieldTestViewController.swift
//  MemeMe
//
//  Created by Humad Syed on 7/8/17.
//  Copyright © 2017 Humad Syed. All rights reserved.
//

import UIKit

class TextFieldTestViewController: UIViewController, UITextFieldDelegate {

    @IBOutlet weak var textField1: UITextField!
    @IBOutlet weak var textField2: UITextField!
    @IBOutlet weak var textField3: UITextField!
    @IBOutlet weak var textField4: UITextField!
    @IBOutlet weak var counterLabel: UILabel!
    
    @IBOutlet weak var zipCodeField: UITextField!
    @IBOutlet weak var moneyField: UITextField!
    @IBOutlet weak var switchField: UITextField!
    @IBOutlet weak var textSwitch: UISwitch!
    
    let emojiDelegate = EmojiDelegate()
    let colorDelegate = ColorDelegate()
    let randomColorDelegate = RandomColorDelegate()
    let textCounter = TextCounterDelegate()
    let zipCodeDelegate = ZipCodeDelegate()
    let moneyDelegate = MoneyDelegate()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        textCounter.counterLabel = counterLabel
        
        textField1.delegate = emojiDelegate
        textField2.delegate = colorDelegate
        textField3.delegate = randomColorDelegate
        textField4.delegate = textCounter
        
        zipCodeField.delegate = zipCodeDelegate
        moneyField.delegate = moneyDelegate
        switchField.delegate = self
        
    }
    
    func textField (_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        return textSwitch.isOn
    }
    
}
