import { useEffect, useRef, useState } from 'react'
import { Modal } from 'antd'

function ModalCart(props) {
  const { open, handleOpenModalCart, children } = props

  return (
    <Modal
      title="Thông tin giỏ hàng"
      open={open}
      width={400}
      footer={null}
      onCancel={handleOpenModalCart}
    >
        {children}
    </Modal>
  )
}

export default ModalCart