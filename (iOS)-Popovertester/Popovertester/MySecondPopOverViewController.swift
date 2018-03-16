//
//  MySecondPopOverViewController.swift
//  Popovertester
//
//  Created by Humad Syed on 3/15/18.
//  Copyright © 2018 Humad Syed. All rights reserved.
//

import UIKit

class MySecondPopOverViewController: UIViewController, PopOverViewController {
    weak var delegate: PopOverModal?
    
    @IBAction func close(_ sender: Any) {
        self.delegate?.closePopOver()
    }
    
    @IBAction func open(_ sender: Any) {
        self.delegate?.openNextPopOver()
    }
}
