// Credit: https://gitlab.com/initforthe/stimulus-remote/-/blob/master/src/index.js

import { Controller } from 'stimulus'

/**
 * Stimulus integration with Rails UJS. Use this controller to handle HTML
 * rendered responses from rails controllers.
 * @extends Controller
 */
export default class extends Controller {

  /**
   * Submits a Rails remote form
   * @param {Event} event - an event with a currentTarget DOMElement
   */
  // submit(event) {
  //   Rails.fire(event.target.form, 'submit')
  // }

  /**
   * Appends the HTML Fragment from the response to the response target
   * @param {Event} event - a Rails UJS response event
   */
  append(event) {
    this._handleResponse(event, (fragment) => {
      this.responseTarget.append(fragment)
    })
  }

  /**
   * Prepends the HTML Fragment from the response to the response target
   * @param {Event} event - a Rails UJS response event
   */
  prepend(event) {
    this._handleResponse(event, (fragment) => {
      this.responseTarget.prepend(fragment)
    })
  }

  /**
   * Replaces the response target with the HTML Fragment from the response
   * @param {Event} event - a Rails UJS response event
   */
  replace(event) {
    this._handleResponse(event, (fragment) => {
      this.responseTarget.replaceWith(fragment)
    })
  }

  /**
   * Replaces the inside of the response target with the HTML Fragment from the response
   * @param {Event} event - a Rails UJS response event
   */
  replaceInner(event) {
    this._handleResponse(event, (fragment) => {
      this.responseTarget.innerHTML = ''
      this.responseTarget.appendChild(fragment)
    })
  }

  /**
   * Removes the response target
   * @param {Event} event - a Rails UJS response event
   */
  remove(event) {
    this._handleResponse(event, fragment => {
      this.responseTarget.remove()
    })
  }

  // Private methods

  /**
   *
   * @param {Event} event - a Rails UJS response event
   * @param {Function} callback - a function taking a fragment parameter
   */
  _handleResponse(event, callback) {
    const [, , xhr] = event.detail
    const fragment = this._documentFragment(xhr.response)
    this._processScripts(fragment)
    callback(fragment)
  }

  /**
   * @private
   * @param {(string|DocumentFragment)} data
   * @returns DocumentFragment
   */
  _documentFragment(data) {
    const el = document.createElement('template')
    el.innerHTML = data
    return el.content
  }

  /**
   * @private
   * @param {NodeList} scripts
   */
  _processScripts(fragment) {
    if (!this.data.has('loadScripts')) return

    for (const script of fragment.querySelectorAll('script')) eval(script.innerHTML) // eslint-disable-line no-eval
  }

  get responseTarget() {
    return this.data.has('responseTarget') ? document.querySelector(this.data.get('responseTarget')) : this.element
  }
}
