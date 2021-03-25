import React from 'react'
import {Input, Button} from "components"
import {IoIosMail} from "react-icons/all"

export const BestDeals = (props) => {
  return (
    <div className="best-deals">
      <span className="text">
        Get your best games deals first
      </span>
      <Input placeholder="Enter your email" iconLocation="left" icon={<IoIosMail size="28" />} className="mr-28 per-100" />
      <Button className="primary-btn large">Subscribe</Button>
    </div>
  )
}