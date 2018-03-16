//
//  ViewController.swift
//  Popovertester
//
//  Created by Humad Syed on 3/15/18.
//  Copyright © 2018 Humad Syed. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
    }

    @IBAction func testPopOver(_ sender: Any) {
        
        let storyboard = UIStoryboard(name: "Main", bundle: nil)
        let popOverViewController = storyboard.instantiateViewController(withIdentifier: "MyPopOverViewController")
        
        let popOverModal = PopOverModal(popOverViewController: popOverViewController, nextPopOver: nil)
        
        let secondPopOverViewController = storyboard.instantiateViewController(withIdentifier: "MySecondPopOverViewController")
        
        let secondPopOverModal = PopOverModal(popOverViewController: secondPopOverViewController, nextPopOver: nil)
        
        popOverModal.nextPopOver = secondPopOverModal
        
        popOverModal.presentPopOver(parentViewController: self)
    }
}

protocol PopOverDelegate: class {
    func closePopOver()
    func openNextPopOver()
}

class PopOverModal: PopOverDelegate {
    var nextPopOver: PopOverModal?
    var popOverViewController: UIViewController
    
    init(popOverViewController: UIViewController, nextPopOver: PopOverModal?) {
        self.nextPopOver = nextPopOver
        self.popOverViewController = popOverViewController
        
        if let popOverViewController = popOverViewController as? PopOverViewController {
            popOverViewController.delegate = self
        }
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func setNextPopOver(to nextPopOver: PopOverModal) {
        self.nextPopOver = nextPopOver
    }
    
    func closePopOver() {
        if (nextPopOver != nil) {
            nextPopOver!.closePopOver()
        }
        popOverViewController.dismiss(animated: true, completion: nil)
    }
    
    func openNextPopOver() {
        if (nextPopOver != nil) {
            nextPopOver!.presentPopOver(parentViewController: popOverViewController)
        }
    }
    
    func presentPopOver(parentViewController: UIViewController) {
        popOverViewController.modalPresentationStyle = .popover
        parentViewController.present(popOverViewController, animated: true, completion: nil)
        
        let popController = popOverViewController.popoverPresentationController
        popController?.permittedArrowDirections = .any
        popController?.sourceView = parentViewController.view
    }
}
