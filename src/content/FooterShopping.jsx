import { Button } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import ModalCart from './ModalCart'

import ModalInfo from './ModalInfo'
import './style.scss'

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const boxPrices = $$('.box-price')

const CART_KEY = 'carts'

function FooterShopping() {
  const [priceProduct, setPriceProduct] = useState()
  const [priceSale, setPriceSale] = useState()
  const [openModalInfo, setOpenModalInfo] = useState(false)
  const [openModalCart, setOpenModalCart] = useState(false)
  const [listCart, setListCart] = useState(() => JSON.parse(localStorage.getItem(CART_KEY)) || [])

  useEffect(() => {
    const boxSaving = $('.box_saving')
    if (boxSaving) {
      const newState = boxSaving.querySelector('strong')?.textContent
      setPriceSale(newState)
    }

    boxPrices.forEach((ele) => {
      const newState = querySelector(ele, '.box-price-present')?.textContent.replace('*', '') || ''
      if (!ele.classList.contains('active')) {
        setPriceProduct(newState)
      } else {
        setPriceProduct(newState)
      }
      return ele.addEventListener('click', (e) => handleClick(e, ele))
    })

    return () => {
      window.removeEventListener('click', (e) => handleClick)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(listCart))
  }, [listCart])

  const handleClick = (e, ele) => {
    const newState = querySelector(ele, '.box-price-present')?.textContent?.replace('*', '')
    setPriceProduct(newState)
  }

  const querySelector = (ele, className) => {
    return ele.querySelector(className)
  }

  const handleOpenModalInfo = () => {
    setOpenModalInfo(!openModalInfo)
  }

  const handleOpenModalCart = () => {
    setOpenModalCart(!openModalCart)
  }

  const handleAddToCart = () => {
    let newState = [...listCart]

    const id = $('.detail')?.dataset?.id
    const index = [...listCart].findIndex((cart) => cart.id === id)
    if (index !== -1) {
      newState[index].quantity += 1
    } else {
      const cart = {}
      cart.id = id
      if ($('.box03.color')) {
        const boxColorItem = $('.box03.color .box03__item.act')
        cart.color = boxColorItem?.textContent
      }

      if ($('.box03.group')) {
        const boxGroupItem = $('.box03.group .box03__item.act')
        cart.group = boxGroupItem?.textContent
      }

      cart.quantity = 1
      cart.price = priceSale ? priceSale : priceProduct
      cart.name = $('.detail h1')?.textContent
      cart.image = $(
        '.detail-slider .owl-stage-outer .owl-stage .owl-item.active img',
      )?.getAttribute('src')

      newState.push(cart)
    }

    setListCart(newState)
  }

  return (
    <div className="footer-box">
      <div className="footer-box-info">
        <h1 className="footer-price">
          {priceSale ? (
            <span>
              {priceSale} <del>{priceProduct}</del>{' '}
            </span>
          ) : (
            <span>{priceProduct}</span>
          )}
        </h1>
        <div className="footer-box-action">
          <button className="footer-box-action-btn btn-info" onClick={handleOpenModalInfo}>
            Get Info
          </button>
          <button className="footer-box-action-btn btn-primary" onClick={handleAddToCart}>
            Add to cart
          </button>
          <button className="footer-box-action-btn btn-primary" onClick={handleOpenModalCart}>
            Carts
          </button>
        </div>
      </div>
      {openModalInfo && (
        <ModalInfo open={openModalInfo} handleOpenModalInfo={handleOpenModalInfo}>
          <div className="box-detail">
            <div className="box-detail-header">
              <h1>{$('.detail h1')?.textContent}</h1>
              <span
                className="box-rate"
                dangerouslySetInnerHTML={{ __html: $('.detail .box02')?.innerHTML }}
              ></span>
            </div>
            <div className="box-detail-content">
              <img
                className="img-detail"
                src={$(
                  '.detail-slider .owl-stage-outer .owl-stage .owl-item.active img',
                ).getAttribute('src')}
                alt=""
              />
              <div
                className="detail"
                dangerouslySetInnerHTML={{ __html: $('.article .content-article')?.innerHTML }}
              ></div>
            </div>
          </div>
        </ModalInfo>
      )}

      {openModalCart && (
        <ModalCart open={openModalCart} handleOpenModalCart={handleOpenModalCart}>
          <div className="box-cart">
            {Array.isArray(listCart) && listCart.length > 0 ? (
              listCart.map((cart) => {
                return (
                  <div className="box-cart-item">
                    <img src={cart.image} alt="" />
                    <h5>{cart.name}</h5>
                    <span>
                      <span>Giá: </span>
                      {cart.price}
                    </span>
                    <div>
                      <span>Số lượng: {cart.quantity}</span>
                    </div>
                    <div className="box-cart-group">
                      {cart?.color ? <Button>{cart?.color}</Button> : null}
                      {cart?.group ? <Button>{cart?.group}</Button> : null}
                    </div>
                  </div>
                )
              })
            ) : (
              <div>Không có sản phẩm nào trong giỏ hàng</div>
            )}
          </div>
        </ModalCart>
      )}
    </div>
  )
}

export default FooterShopping
